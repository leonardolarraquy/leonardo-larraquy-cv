import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { BASE_URL, CONTACT_EMAIL } from '@/data/constants'

export function PrivacyPage() {
  const title = 'Política de privacidad - Cloud Experts'
  const description =
    'Cómo Cloud Experts trata los datos del formulario de contacto, la analítica y WhatsApp en cloudexperts.com.ar.'
  const url = `${BASE_URL}/privacidad.html`

  return (
    <Layout variant="subpage">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
      </Helmet>
      <section className="px-5 py-20 sm:px-8 md:px-12">
        <div className="mx-auto max-w-3xl space-y-6 text-white/80">
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-white">
              Inicio
            </Link>
            {' / '}
            <span className="text-white">Política de privacidad</span>
          </nav>
          <h1 className="text-4xl font-normal tracking-tight text-white">Política de privacidad</h1>
          <p className="text-sm text-white/50">Última actualización: octubre de 2026</p>
          <h2 className="text-2xl text-white">Responsable</h2>
          <p>
            Cloud Experts, consultoría IT en Escobar, Buenos Aires, Argentina. Contacto:{' '}
            <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <h2 className="text-2xl text-white">Datos que recopilamos</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Formulario de contacto: nombre, email, empresa y mensaje que enviás de forma
              voluntaria. El envío lo procesa Getform (getform.io).
            </li>
            <li>
              Analítica: medición de visitas con Google Tag Manager y Google Analytics 4.
            </li>
            <li>
              WhatsApp: si abrís el botón, la conversación ocurre en WhatsApp según las políticas
              de Meta.
            </li>
          </ul>
          <h2 className="text-2xl text-white">Para qué los usamos</h2>
          <p>
            Respondemos consultas comerciales y técnicas, y medimos el uso del sitio. No vendemos
            datos personales.
          </p>
          <h2 className="text-2xl text-white">Conservación y derechos</h2>
          <p>
            Guardamos los mensajes el tiempo necesario para gestionar la consulta. Podés pedir
            acceso, corrección o eliminación escribiendo a {CONTACT_EMAIL}, conforme a la Ley
            25.326.
          </p>
        </div>
      </section>
    </Layout>
  )
}
