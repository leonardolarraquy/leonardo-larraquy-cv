import { Link } from 'react-router-dom'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { technologies as techList } from '@/data/constants'

export function SectionTecnologias() {
  return (
    <section id="tecnologias" className="px-5 py-20 sm:px-8 md:px-12">
      <RevealOnScroll>
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-4xl font-normal tracking-tight text-white drop-shadow-lg md:text-6xl">
            Tecnologías
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
            Dominio de las <strong className="text-white">tecnologías más demandadas</strong> en el
            mercado para desarrollar soluciones de alto impacto.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-3 gap-4 md:grid-cols-5 md:gap-6">
        {techList.map((tech, i) => {
          const inner = (
            <div className="flex flex-col items-center rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-colors duration-300 hover:bg-white/15">
              <div className="flex h-16 w-full items-center justify-center md:h-20">
                {tech.secondaryImage ? (
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    <img
                      src={tech.image}
                      alt=""
                      className="h-8 object-contain"
                      loading="lazy"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    <img
                      src={tech.secondaryImage}
                      alt=""
                      className="h-8 object-contain"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="max-h-16 max-w-full object-contain md:max-h-20"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      if (tech.fallback) img.src = tech.fallback
                    }}
                  />
                )}
              </div>
              <span className="mt-3 text-center text-xs font-medium text-white/80 md:text-sm">
                {tech.name}
              </span>
            </div>
          )

          return (
            <RevealOnScroll key={tech.name} delay={100 + i * 40}>
              {tech.href ? (
                <Link to={tech.href} className="block">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </RevealOnScroll>
          )
        })}
      </div>
    </section>
  )
}
