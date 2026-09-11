import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { locations, professionTypes } from '@/data'
import { BASE_URL } from '@/data/constants'

export function ProfessionalPage() {
  const { slug } = useParams<{ slug: string }>()

  let prof = null
  let location = null

  for (const p of professionTypes) {
    for (const l of locations) {
      if (`${p.slug}-${l.slug}` === slug) {
        prof = p
        location = l
        break
      }
    }
    if (prof) break
  }

  if (!prof || !location) {
    return (
      <Layout variant="subpage">
        <div className="px-5 py-32 text-center text-white">Página no encontrada</div>
      </Layout>
    )
  }

  const title = `${prof.name} en ${location.name} - Cloud Experts | IT Professionals Argentina`
  const description = `${prof.name} en ${location.name}. Consultoría IT profesional con más de 20 años de experiencia.`
  const url = `${BASE_URL}/profesionales/${prof.slug}-${location.slug}.html`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: title,
    description,
    url,
    jobTitle: prof.name,
    worksFor: { '@type': 'Organization', name: 'Cloud Experts', url: BASE_URL },
    workLocation: { '@type': 'Place', name: location.name },
  }

  const reasons = [
    'Certificaciones reconocidas (AWS, Oracle, Scrum Master)',
    'Más de 20 años de experiencia en proyectos empresariales',
    `Servicios remotos disponibles para empresas en ${location.name}`,
    'Enfoque en resultados y optimización de costos',
    'Consultoría inicial gratuita sin compromiso',
  ]

  return (
    <Layout variant="subpage">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={[...prof.keywords, ...location.keywords, 'cloud experts'].join(', ')}
        />
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
            <span className="text-white">
              {prof.name} en {location.name}
            </span>
          </nav>

          <RevealOnScroll>
            <h1 className="mb-6 text-4xl font-normal tracking-tight text-white md:text-6xl">
              {prof.name} en {location.name}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <p className="text-xl leading-relaxed text-white/80">
              Busca un {prof.name.toLowerCase()} en {location.name}? Cloud Experts ofrece servicios
              profesionales de consultoría IT con más de 20 años de experiencia. Especializados en
              AWS, Java, DevOps y migración a la nube.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <h2 className="mt-8 text-2xl font-medium text-white">
              ¿Por qué elegir Cloud Experts?
            </h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-white/80">
              {reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <a
              href="/#contacto"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              Contactar {prof.name}
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </Layout>
  )
}
