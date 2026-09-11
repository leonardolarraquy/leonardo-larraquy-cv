import { RevealOnScroll } from '@/components/RevealOnScroll'
import { certifications } from '@/data/constants'

export function SectionCertificaciones() {
  return (
    <section id="certificaciones" className="px-5 py-20 sm:px-8 md:px-12">
      <RevealOnScroll>
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-4xl font-normal tracking-tight text-white drop-shadow-lg md:text-6xl">
            Certificaciones Profesionales
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
            Nuestro equipo cuenta con{' '}
            <strong className="text-white">certificaciones reconocidas globalmente</strong> que avalan
            nuestra experiencia y compromiso con la excelencia técnica.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {certifications.map((cert, i) => (
          <RevealOnScroll key={cert.name} delay={100 + i * 50}>
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                <img
                  src={cert.image}
                  alt={cert.alt}
                  className="absolute inset-0 h-full w-full object-contain p-2"
                  loading="lazy"
                />
              </div>
              <span className="mt-4 text-center text-sm font-medium text-white/80">{cert.name}</span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
