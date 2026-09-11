import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { services } from '@/data'

type TabId = 'desarrollo' | 'devops' | 'migracion' | 'capacitacion'

const tabs: { id: TabId; label: string }[] = [
  { id: 'desarrollo', label: 'Desarrollo & Cloud' },
  { id: 'devops', label: 'DevOps' },
  { id: 'migracion', label: 'Migración Cloud' },
  { id: 'capacitacion', label: 'Capacitación' },
]

const desarrolloServices = [
  'arquitectura-aws',
  'desarrollo-fullstack',
  'desarrollo-mobile',
  'desarrollo-java',
  'bases-datos',
  'business-intelligence',
  'wordpress',
]

const devopsItems = [
  {
    title: 'Integración Continua',
    body: 'Implementación de pipelines de CI/CD para entregas rápidas y confiables. Automatizamos el proceso de desarrollo para mejorar la calidad del código y reducir el tiempo de lanzamiento.',
  },
  {
    title: 'Automatización',
    body: 'Automatización de procesos para reducir errores y aumentar la eficiencia. Implementamos soluciones que liberan a su equipo de tareas repetitivas.',
  },
  {
    title: 'Monitoreo y Rendimiento',
    body: 'Implementación de soluciones de monitoreo para optimizar el rendimiento. Proporcionamos visibilidad en tiempo real de sus sistemas.',
  },
  {
    title: 'Seguridad DevSecOps',
    body: 'Integración de prácticas de seguridad en el ciclo de vida de desarrollo. Aseguramos que la seguridad sea una prioridad desde el inicio.',
  },
]

const migracionItems = [
  {
    title: 'Estrategia de Migración',
    body: 'Desarrollo de un plan personalizado para una migración a la nube sin problemas. Analizamos su infraestructura actual y diseñamos una hoja de ruta detallada.',
  },
  {
    title: 'Optimización de Costos',
    body: 'Análisis y optimización de costos para maximizar el ROI de su infraestructura en la nube.',
  },
  {
    title: 'Mejora del Rendimiento',
    body: 'Optimización de aplicaciones y arquitectura para un mejor rendimiento en la nube.',
  },
  {
    title: 'Seguridad y Cumplimiento',
    body: 'Implementación de mejores prácticas de seguridad y cumplimiento normativo en la nube.',
  },
]

const capacitacionItems = [
  {
    title: 'Cursos Personalizados',
    body: 'Programas de formación adaptados a las necesidades específicas de su empresa.',
  },
  {
    title: 'Formación en Equipo',
    body: 'Capacitación para grupos, fomentando la colaboración y el aprendizaje conjunto.',
  },
  {
    title: 'Prácticas en AWS',
    body: 'Ejercicios prácticos en entornos reales de AWS para una experiencia de aprendizaje inmersiva.',
  },
  {
    title: 'Casos de Estudio',
    body: 'Análisis de casos reales para aplicar los conocimientos en situaciones prácticas.',
  },
]

function ServiceRow({
  slug,
  name,
  description,
  delay,
}: {
  slug: string
  name: string
  description: string
  delay: number
}) {
  return (
    <RevealOnScroll delay={delay}>
      <Link
        to={`/servicios/${slug}.html`}
        className="block rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-colors duration-300 hover:bg-white/15"
      >
        <h3 className="text-lg font-medium text-white">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          {description}{' '}
          <span className="text-white/90">Más info →</span>
        </p>
      </Link>
    </RevealOnScroll>
  )
}

function PanelGrid({ items, baseDelay }: { items: { title: string; body: string }[]; baseDelay: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <RevealOnScroll key={item.title} delay={baseDelay + i * 80}>
          <div className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
            <h3 className="text-xl font-medium text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{item.body}</p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  )
}

export function SectionServicios() {
  const [activeTab, setActiveTab] = useState<TabId>('desarrollo')

  const desarrolloList = services.filter((s) => desarrolloServices.includes(s.id))
  const liderazgo = {
    name: 'Liderazgo Técnico',
    description: 'Gestión de equipos y proyectos con metodologías ágiles.',
  }

  return (
    <section
      id="servicios"
      className="px-5 py-20 sm:px-8 md:px-12"
    >
      <RevealOnScroll>
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-4xl font-normal tracking-tight text-white drop-shadow-lg md:text-6xl">
            Servicios Especializados
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
            Ofrecemos <strong className="text-white">soluciones integrales</strong> en desarrollo,
            cloud y análisis de datos para impulsar tu negocio hacia el futuro digital.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg border px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'border-white/30 bg-white/20 text-white'
                  : 'border-white/15 bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {activeTab === 'desarrollo' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {desarrolloList.map((s, i) => (
            <ServiceRow
              key={s.id}
              slug={s.slug}
              name={s.name}
              description={s.description}
              delay={150 + i * 60}
            />
          ))}
          <RevealOnScroll delay={150 + desarrolloList.length * 60}>
            <div className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <h3 className="text-lg font-medium text-white">{liderazgo.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{liderazgo.description}</p>
            </div>
          </RevealOnScroll>
        </div>
      )}

      {activeTab === 'devops' && <PanelGrid items={devopsItems} baseDelay={150} />}
      {activeTab === 'migracion' && <PanelGrid items={migracionItems} baseDelay={150} />}
      {activeTab === 'capacitacion' && <PanelGrid items={capacitacionItems} baseDelay={150} />}
    </section>
  )
}
