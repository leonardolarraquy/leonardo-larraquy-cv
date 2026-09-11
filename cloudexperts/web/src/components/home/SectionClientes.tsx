import { RevealOnScroll } from '@/components/RevealOnScroll'
import { clients } from '@/data/constants'

export function SectionClientes() {
  const doubled = [...clients, ...clients]

  return (
    <section id="clientes" className="overflow-hidden px-5 py-20 sm:px-8 md:px-12">
      <RevealOnScroll>
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-4xl font-normal tracking-tight text-white drop-shadow-lg md:text-6xl">
            Nuestros Clientes
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
            Empresas que han <strong className="text-white">confiado en nuestros servicios</strong>{' '}
            de consultoría y desarrollo.
          </p>
        </div>
      </RevealOnScroll>

      <div className="sliding-logos flex w-max">
        {doubled.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex h-24 w-48 shrink-0 items-center justify-center px-4"
          >
            <a
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-full w-full items-center justify-center rounded-lg p-2 ${
                client.lightBackground ? 'bg-white/95' : ''
              }`}
            >
              <img
                src={client.image}
                alt={client.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
