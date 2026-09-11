import { Helmet } from 'react-helmet-async'
import { BASE_URL } from '@/data/constants'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Cloud Experts',
  logo: `${BASE_URL}/favicon-512x512.png`,
  image: `${BASE_URL}/favicon-512x512.png`,
  description:
    'Consultoría especializada en AWS, desarrollo Full Stack con React, aplicaciones móviles con React Native, DevOps y migración a la nube con más de 20 años de experiencia',
  url: BASE_URL,
  email: 'info@cloudexperts.com.ar',
  telephone: '+54-9-11-6709-8413',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Escobar',
    addressRegion: 'Buenos Aires',
    addressCountry: 'Argentina',
  },
  foundingDate: '2020',
  numberOfEmployees: '5-10',
  serviceArea: { '@type': 'Country', name: 'Argentina' },
  sameAs: [
    'https://www.linkedin.com/in/leonardolarraquy/',
    'https://www.upwork.com/freelancers/leonardol25',
  ],
}

export function HomeSeo() {
  const title =
    'Cloud Experts - Expertos en AWS, Full Stack, Mobile & DevOps | Consultoría IT Argentina'
  const description =
    'Cloud Experts: Consultoría especializada en AWS, desarrollo Full Stack con React y Node.js, aplicaciones móviles con React Native, DevOps y migración a la nube. 20+ años de experiencia.'

  return (
    <Helmet>
      <html lang="es" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="cloud experts, aws argentina, consultoría aws, desarrollo fullstack, react developer, react native, nodejs developer, nextjs, typescript, mobile development, devops argentina, migración cloud, arquitectura aws, java developer, aws certified, cloud consulting, it consulting argentina"
      />
      <meta name="author" content="Cloud Experts - Consultoría IT Profesional" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="geo.region" content="AR-B" />
      <meta name="geo.placename" content="Escobar, Buenos Aires, Argentina" />
      <link rel="canonical" href={`${BASE_URL}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${BASE_URL}/`} />
      <meta property="og:title" content="Cloud Experts - Expertos en AWS, Full Stack, Mobile & DevOps" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${BASE_URL}/img/cloud-experts-og.jpg`} />
      <meta property="og:site_name" content="Cloud Experts" />
      <meta property="og:locale" content="es_AR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Cloud Experts - AWS, Full Stack, Mobile & DevOps" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/img/cloud-experts-og.jpg`} />
      <meta name="theme-color" content="#0a0a0a" />
      <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
    </Helmet>
  )
}
