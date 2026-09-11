import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { technologies } from '@/data'
import { BASE_URL } from '@/data/constants'

export function TechnologyPage() {
  const { slug } = useParams<{ slug: string }>()
  const tech = technologies.find((t) => t.slug === slug)

  if (!tech) {
    return (
      <Layout variant="subpage">
        <div className="px-5 py-32 text-center text-white">Tecnología no encontrada</div>
      </Layout>
    )
  }

  const title = `Experto en ${tech.name} - Cloud Experts | Consultoría IT Argentina`
  const description = `Consultoría especializada en ${tech.name}. ${tech.description}. Más de 20 años de experiencia.`
  const url = `${BASE_URL}/tecnologias/${tech.slug}.html`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url,
    provider: { '@type': 'Organization', name: 'Cloud Experts', url: BASE_URL },
  }

  return (
    <Layout variant="subpage">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={[...tech.keywords, 'cloud experts'].join(', ')} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="px-5 py-20 sm:px-8 md:px-12">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-8 text-sm text-white/60" aria-label="Breadcrumb">
            <Link to="/" className="text-white/80 hover:text-white">
              Inicio
            </Link>
            {' / '}
            <Link to="/#tecnologias" className="text-white/80 hover:text-white">
              Tecnologías
            </Link>
            {' / '}
            <span className="text-white">{tech.name}</span>
          </nav>

          <RevealOnScroll>
            <h1 className="mb-6 text-4xl font-normal tracking-tight text-white md:text-6xl">
              Experto en {tech.name}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <p className="text-xl leading-relaxed text-white/80">
              {tech.description}. En Cloud Experts, contamos con amplia experiencia en {tech.name},
              ofreciendo soluciones profesionales para empresas en Argentina y Latinoamérica.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <h2 className="mt-8 text-2xl font-medium text-white">
              Nuestra Experiencia con {tech.name}
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">
              Con más de 20 años de experiencia en el sector IT, hemos trabajado extensivamente con{' '}
              {tech.name}, implementando soluciones robustas y escalables para empresas de todos los
              tamaños. Nuestro equipo certificado garantiza resultados de alta calidad.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <a
              href="/#contacto"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              Consultar sobre {tech.name}
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </Layout>
  )
}
