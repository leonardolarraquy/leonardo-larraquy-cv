import { ChevronRight } from 'lucide-react'
import { LeftAccentBadge } from '@/components/GlassPanel'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import {
  CONTACT_EMAIL,
  heroServices,
  LEONARDO_PORTRAIT,
  WHATSAPP_URL,
} from '@/data/constants'

export function SectionHero() {
  return (
    <section className="flex min-h-screen flex-col justify-between px-5 pt-24 pb-12 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          {heroServices.map((service, i) => (
            <RevealOnScroll key={service} delay={150 + i * 120}>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                / {service}
              </p>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Más de 20 años liderando equipos de desarrollo y gestionando migraciones a la nube.
            Optimizamos tu infraestructura AWS y aceleramos tus desarrollos con las mejores
            prácticas de la industria.
          </p>
        </RevealOnScroll>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <RevealOnScroll delay={150}>
            <LeftAccentBadge className="mb-5">20+ Años de Experiencia</LeftAccentBadge>
          </RevealOnScroll>
          <RevealOnScroll delay={280}>
            <h1 className="text-5xl leading-[1.05] font-normal tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Cloud.
              <br />
              Preciso.
              <br />
              Escalable.
            </h1>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={420}>
          <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md">
            <img
              src={LEONARDO_PORTRAIT}
              alt="Leonardo Larraquy, fundador de Cloud Experts"
              className="h-24 w-20 rounded-lg object-cover"
            />
            <div className="flex flex-col gap-1.5 pr-2">
              <p className="text-sm font-medium text-white">Habla con Leonardo</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                Fundador de Cloud Experts
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                Consultoría gratuita
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <span className="sr-only">{CONTACT_EMAIL}</span>
    </section>
  )
}
