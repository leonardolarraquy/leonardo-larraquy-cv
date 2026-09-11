import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { getServiceContent } from '@/content/serviceContent'
import { services } from '@/data'
import { BASE_URL } from '@/data/constants'

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <Layout variant="subpage">
        <div className="px-5 py-32 text-center text-white">Servicio no encontrado</div>
      </Layout>
    )
  }

  const content = getServiceContent(service.id)
  const title = `${service.name} - Cloud Experts | Consultoría IT Profesional Argentina`
  const description = `${service.description}. Más de 20 años de experiencia. Servicios profesionales en Argentina.`
  const url = `${BASE_URL}/servicios/${service.slug}.html`
  const related = services.filter((s) => s.id !== service.id).slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'Cloud Experts',
      url: BASE_URL,
    },
    areaServed: { '@type': 'Country', name: 'Argentina' },
  }

  return (
    <Layout variant="subpage">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={[...service.keywords, 'cloud experts'].join(', ')} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="px-5 py-20 sm:px-8 md:px-12">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 text-white/60">
              <li>
                <Link to="/" className="text-white/80 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/#servicios" className="text-white/80 hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{service.name}</li>
            </ol>
          </nav>

          <RevealOnScroll>
            <h1 className="mb-6 text-4xl font-normal tracking-tight text-white md:text-6xl">
              {service.name}
            </h1>
          </RevealOnScroll>

          <div className="space-y-6 text-white/80">
            <RevealOnScroll delay={100}>
              <p className="text-xl leading-relaxed">{service.description}</p>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <h2 className="text-2xl font-medium text-white">¿Por qué elegir Cloud Experts?</h2>
              <ul className="mt-4 list-inside list-disc space-y-2">
                {content.beneficios.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <h2 className="text-2xl font-medium text-white">Nuestro Enfoque</h2>
              {content.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 leading-relaxed">
                  {p}
                </p>
              ))}
              {content.sections?.map((section) => (
                <div key={section.heading} className="mt-6">
                  <h3 className="text-xl font-medium text-white">{section.heading}</h3>
                  {section.items && (
                    <ul className="mt-3 list-inside list-disc space-y-2">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.paragraph && (
                    <p className="mt-3 leading-relaxed">{section.paragraph}</p>
                  )}
                </div>
              ))}
            </RevealOnScroll>

            <RevealOnScroll delay={250}>
              <a
                href="/#contacto"
                className="mt-6 inline-flex rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
              >
                Solicitar Consultoría Gratuita
              </a>
            </RevealOnScroll>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-medium text-white">Servicios Relacionados</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {related.map((s, i) => (
                <RevealOnScroll key={s.id} delay={300 + i * 50}>
                  <Link
                    to={`/servicios/${s.slug}.html`}
                    className="block rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15"
                  >
                    <h3 className="text-xl font-medium text-white">{s.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{s.description}</p>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
