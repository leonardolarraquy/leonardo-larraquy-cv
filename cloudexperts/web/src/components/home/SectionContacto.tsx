import { ContactForm } from '@/components/ContactForm'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { CONTACT_EMAIL, referrals, WHATSAPP_URL } from '@/data/constants'

export function SectionContacto() {
  return (
    <section id="contacto" className="px-5 py-20 sm:px-8 md:px-12">
      <RevealOnScroll>
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-4xl font-normal tracking-tight text-white drop-shadow-lg md:text-6xl">
            Contactá con nosotros
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
            ¿Listo para llevar tu proyecto al siguiente nivel?{' '}
            <strong className="text-white">Contanos</strong> y te ayudamos a transformar tu visión
            en realidad.
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
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
                </svg>
                Escribinos por WhatsApp
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
