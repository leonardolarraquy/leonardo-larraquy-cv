import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEO_URL } from '@/data/constants'

/** Marker id placed in HomePage after the cinematic sections */
export const SCROLL_VIDEO_END_ID = 'scroll-video-end'

function mediaDimensions(source: CanvasImageSource): { width: number; height: number } {
  if (source instanceof HTMLVideoElement) {
    return { width: source.videoWidth, height: source.videoHeight }
  }
  if (source instanceof ImageBitmap) {
    return { width: source.width, height: source.height }
  }
  if (source instanceof HTMLCanvasElement) {
    return { width: source.width, height: source.height }
  }
  return { width: 1920, height: 1080 }
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  cw: number,
  ch: number,
) {
  const { width: sourceWidth, height: sourceHeight } = mediaDimensions(source)
  if (!sourceWidth || !sourceHeight) return

  const videoAspect = sourceWidth / sourceHeight
  const canvasAspect = cw / ch

  let sx = 0
  let sy = 0
  let cropW = sourceWidth
  let cropH = sourceHeight

  if (videoAspect > canvasAspect) {
    cropW = sourceHeight * canvasAspect
    sx = (sourceWidth - cropW) / 2
  } else {
    cropH = sourceWidth / canvasAspect
    sy = (sourceHeight - cropH) / 2
  }

  ctx.drawImage(source, sx, sy, cropW, cropH, 0, 0, cw, ch)
}

function getScrollProgress(): number {
  const endEl = document.getElementById(SCROLL_VIDEO_END_ID)
  const scrollY = window.scrollY

  if (endEl) {
    const scrollRange = Math.max(1, endEl.offsetTop - window.innerHeight * 0.5)
    return Math.min(1, Math.max(0, scrollY / scrollRange))
  }

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  return scrollHeight > 0 ? Math.min(1, Math.max(0, scrollY / scrollHeight)) : 0
}

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<ImageBitmap[]>([])
  const canvasReadyRef = useRef(false)
  const smoothedRef = useRef(0)
  const rafRef = useRef<number>(0)

  const [posterHidden, setPosterHidden] = useState(false)
  const [videoVisible, setVideoVisible] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Frame extraction — runs once on mount, never re-runs when cache becomes ready
  useEffect(() => {
    if (!isClient || reducedMotion) return

    const video = videoRef.current
    if (!video) return

    let cancelled = false

    const extractFrames = async () => {
      await new Promise((r) => setTimeout(r, 300))
      if (cancelled) return

      await new Promise<void>((resolve) => {
        if (video.readyState >= 2) resolve()
        else video.addEventListener('loadeddata', () => resolve(), { once: true })
      })
      if (cancelled) return

      const offscreen = document.createElement('video')
      offscreen.src = HERO_VIDEO_URL
      offscreen.muted = true
      offscreen.playsInline = true
      offscreen.preload = 'auto'

      await new Promise<void>((resolve) => {
        offscreen.addEventListener('loadeddata', () => resolve(), { once: true })
      })
      if (cancelled) return

      const duration = offscreen.duration
      if (!duration || !isFinite(duration)) return

      const frameCount = Math.min(90, Math.max(24, Math.floor(duration * 12)))
      const maxWidth = 960
      const scale = Math.min(1, maxWidth / (offscreen.videoWidth || maxWidth))
      const w = Math.floor((offscreen.videoWidth || maxWidth) * scale)
      const h = Math.floor((offscreen.videoHeight || 540) * scale)

      const offCanvas = document.createElement('canvas')
      offCanvas.width = w
      offCanvas.height = h
      const offCtx = offCanvas.getContext('2d')
      if (!offCtx) return

      const bitmaps: ImageBitmap[] = []
      for (let i = 0; i < frameCount; i++) {
        if (cancelled) {
          bitmaps.forEach((b) => b.close())
          return
        }
        const t = (i / (frameCount - 1)) * (duration - 0.05)
        offscreen.currentTime = t
        await new Promise<void>((resolve) => {
          offscreen.addEventListener('seeked', () => resolve(), { once: true })
        })
        offCtx.drawImage(offscreen, 0, 0, w, h)
        bitmaps.push(await createImageBitmap(offCanvas))
      }

      if (cancelled) {
        bitmaps.forEach((b) => b.close())
        return
      }

      framesRef.current.forEach((b) => b.close())
      framesRef.current = bitmaps
      canvasReadyRef.current = true
      setCanvasReady(true)
    }

    extractFrames()

    return () => {
      cancelled = true
      framesRef.current.forEach((b) => b.close())
      framesRef.current = []
      canvasReadyRef.current = false
    }
  }, [isClient, reducedMotion])

  // Draw loop + visible video setup — stable deps, reads canvasReadyRef
  useEffect(() => {
    if (!isClient || reducedMotion) return

    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const onLoadedData = () => {
      setVideoVisible(true)
      setTimeout(() => setPosterHidden(true), 100)
    }

    video.addEventListener('loadeddata', onLoadedData)
    if (video.readyState >= 2) onLoadedData()

    const draw = () => {
      const target = getScrollProgress()
      smoothedRef.current += (target - smoothedRef.current) * 0.12

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      const cw = Math.max(1, Math.floor(rect.width * dpr))
      const ch = Math.max(1, Math.floor(rect.height * dpr))

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
      }

      const frames = framesRef.current
      const useCache = canvasReadyRef.current && frames.length > 0

      if (useCache) {
        const idx = Math.min(
          frames.length - 1,
          Math.floor(smoothedRef.current * (frames.length - 1)),
        )
        ctx.clearRect(0, 0, cw, ch)
        try {
          drawCover(ctx, frames[idx], cw, ch)
        } catch {
          /* closed bitmap — fall through to seek on next frame */
        }
      } else if (video.readyState >= 2 && video.duration) {
        const seekTime = smoothedRef.current * (video.duration - 0.05)
        if (Math.abs(video.currentTime - seekTime) > 0.04) {
          video.currentTime = seekTime
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadeddata', onLoadedData)
    }
  }, [isClient, reducedMotion])

  if (!isClient) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]"
        aria-hidden
      />
    )
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]"
      aria-hidden
    >
      <img
        src="/hero-poster.jpg"
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          posterHidden || reducedMotion ? 'opacity-0' : 'opacity-100'
        }`}
        onError={(e) => {
          ;(e.target as HTMLImageElement).style.display = 'none'
        }}
      />
      {!reducedMotion && (
        <>
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              canvasReady ? 'opacity-0' : videoVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              canvasReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
      {/* Subtle bottom fade so lower sections stay readable without hiding the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/20 to-[#0a0a0a]/50" />
    </div>
  )
}
