import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { locations, services } from '@/data'
import { BASE_URL } from '@/data/constants'

export function LocationPage() {
  const { slug } = useParams<{ slug: string }>()
  const location = locations.find((l) => l.slug === slug)

  if (!location) {
    return (
      <Layout variant="subpage">
        <div className="px-5 py-32 text-center text-white">Ubicación no encontrada</div>
      </Layout>
    )
  }

  const title = `IT Professionals en ${location.name} - Cloud Experts | Consultoría IT`
  const description = `Consultoría IT profesional en ${location.name}. Especialistas en AWS, Java, DevOps. Más de 20 años de experiencia.`
  const url = `${BASE_URL}/ubicaciones/${location.slug}.html`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: title,
    description,
    url,
    areaServed: { '@type': 'City', name: location.name },
  }

  return (
    <Layout variant="subpage">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={[...location.keywords, 'cloud experts'].join(', ')} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="px-5 py-20 sm:px-8 md:px-12">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-8 text-sm text-white/60">
            <a href="/" className="text-white/80 hover:text-white">
              Inicio
            </a>
            {' / '}
            <span className="text-white">{location.name}</span>
          </nav>

          <RevealOnScroll>
            <h1 className="mb-6 text-4xl font-normal tracking-tight text-white md:text-6xl">
              IT Professionals en {location.name}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <p className="text-xl leading-relaxed text-white/80">
              Cloud Experts ofrece servicios de consultoría IT profesional para empresas en{' '}
              {location.name}. Especializados en AWS, desarrollo Java, DevOps y migración a la nube.
              Más de 20 años de experiencia.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <h2 className="mt-8 text-2xl font-medium text-white">
              Servicios en {location.name}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {services.slice(0, 6).map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-md"
                >
                  <h3 className="text-xl font-medium text-white">{s.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{s.description}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <a
              href="/#contacto"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              Consultoría Gratuita en {location.name}
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </Layout>
  )
}
