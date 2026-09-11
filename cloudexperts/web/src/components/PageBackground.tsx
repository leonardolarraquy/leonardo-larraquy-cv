import { useEffect, useRef, useState } from 'react'
import heroPoster from '@/assets/hero.png'
import { HERO_VIDEO_URL } from '@/data/constants'

/** Fixed cinematic background for subpages — matches ScrollVideo styling without scroll scrub. */
export function PageBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const video = videoRef.current
    if (!video) return

    const seekToFrame = () => {
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = Math.min(2.5, video.duration * 0.35)
      }
      setVideoReady(true)
    }

    video.addEventListener('loadeddata', seekToFrame)
    if (video.readyState >= 2) seekToFrame()

    return () => video.removeEventListener('loadeddata', seekToFrame)
  }, [reducedMotion])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]"
      aria-hidden
    >
      <img
        src={heroPoster}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoReady && !reducedMotion ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {!reducedMotion && (
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/20 to-[#0a0a0a]/50" />
    </div>
  )
}
