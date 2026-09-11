import { ContactForm } from '@/components/ContactForm'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { CONTACT_EMAIL, CONTACT_PHONE, referrals } from '@/data/constants'

export function SectionContacto() {
  return (
    <section id="contacto" className="px-5 py-20 sm:px-8 md:px-12">
      <RevealOnScroll>
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-4xl font-normal tracking-tight text-white drop-shadow-lg md:text-6xl">
            Contacta Conmigo
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
            ¿Listo para llevar tu proyecto al siguiente nivel?{' '}
            <strong className="text-white">Cuéntame sobre tus necesidades</strong> y te ayudaremos a
            transformar tu visión en realidad.
          </p>
        </div>
      </RevealOnScroll>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        <ContactForm />

        <div className="space-y-8">
          <RevealOnScroll delay={150}>
            <h3 className="text-2xl font-medium text-white">Referencias Profesionales</h3>
          </RevealOnScroll>

          {referrals.map((ref, i) => (
            <RevealOnScroll key={ref.name} delay={200 + i * 50}>
              <a
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/80 transition-colors duration-300 hover:text-white"
              >
                <div className="flex h-12 w-28 shrink-0 items-center justify-center rounded-lg bg-white/95 px-2 py-1">
                  <img
                    src={ref.image}
                    alt={ref.name}
                    className="max-h-8 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span>{ref.label}</span>
              </a>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={300}>
            <div>
              <h4 className="mb-2 font-medium text-white">Datos de contacto:</h4>
              <p className="text-white/70">Email: {CONTACT_EMAIL}</p>
              <p className="text-white/70">Móvil: {CONTACT_PHONE}</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
