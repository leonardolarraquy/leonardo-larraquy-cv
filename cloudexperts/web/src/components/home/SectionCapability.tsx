import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LeftAccentBadge } from '@/components/GlassPanel'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { capabilities } from '@/data/constants'

export function SectionCapability() {
  return (
    <section className="flex min-h-screen flex-col justify-between px-5 pt-24 pb-12 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <RevealOnScroll delay={120}>
          <LeftAccentBadge>Consultoría Especializada</LeftAccentBadge>
        </RevealOnScroll>

        <RevealOnScroll delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            No solo implementamos — diseñamos, optimizamos y entregamos la señal que tu equipo
            necesita para actuar con precisión en cloud, full stack y DevOps.
          </p>
        </RevealOnScroll>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <RevealOnScroll delay={180}>
            <h2 className="text-5xl leading-[1.05] font-normal tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Expertos en
              <br />
              cloud y código.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={320}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 drop-shadow-md sm:text-base">
              Desde la arquitectura AWS hasta el despliegue final, Cloud Experts convierte tu
              visión en sistemas que escalan — con claridad, precisión y velocidad.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={420}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#servicios"
                className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
              >
                Ver servicios
                <ChevronRight size={14} />
              </a>
              <a
                href="#contacto"
                className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
              >
                Consultoría gratuita
              </a>
            </div>
          </RevealOnScroll>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
          {capabilities.map((cap, i) => (
            <RevealOnScroll key={cap.title} delay={300 + i * 110}>
              <Link
                to={cap.href}
                className={`flex gap-5 py-5 transition-colors duration-300 hover:bg-white/5 ${
                  i < capabilities.length - 1 ? 'border-b border-white/15' : ''
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-white sm:text-lg">{cap.title}</h3>
                    <ChevronRight
                      size={16}
                      className="text-white/40 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{cap.body}</p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
