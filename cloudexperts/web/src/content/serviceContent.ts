export interface ServiceContentBlock {
  paragraphs: string[]
  sections?: { heading: string; items?: string[]; paragraph?: string }[]
  beneficios: string[]
}

export const serviceContent: Record<string, ServiceContentBlock> = {
  'arquitectura-aws': {
    paragraphs: [
      'En Cloud Experts, diseñamos arquitecturas AWS escalables, seguras y optimizadas para costos. Nuestro enfoque se basa en las mejores prácticas de AWS Well-Architected Framework, garantizando soluciones que crecen con su negocio.',
    ],
    sections: [
      {
        heading: 'Servicios que Ofrecemos',
        items: [
          'Diseño de arquitecturas cloud: EC2, Lambda, ECS, EKS para aplicaciones escalables',
          'Almacenamiento y bases de datos: S3, RDS, DynamoDB, ElastiCache optimizados',
          'Redes y seguridad: VPC, Security Groups, WAF, CloudFront para máxima protección',
          'Automatización: CloudFormation, Terraform, CDK para infraestructura como código',
          'Monitoreo y optimización: CloudWatch, X-Ray, Cost Explorer para rendimiento y costos',
        ],
      },
      {
        heading: 'Beneficios Clave',
        paragraph:
          'Nuestras arquitecturas AWS reducen costos hasta un 40% mediante optimización de recursos, mejoran la disponibilidad con diseños multi-AZ, y aceleran el time-to-market con CI/CD automatizado.',
      },
    ],
    beneficios: [
      'Arquitecturas escalables desde el día uno con auto-scaling',
      'Reducción de costos mediante análisis y optimización continua',
      'Seguridad de nivel empresarial con compliance (SOC 2, ISO 27001)',
      'Alta disponibilidad con diseños multi-región y disaster recovery',
      'Automatización completa con Infrastructure as Code (IaC)',
    ],
  },
  'desarrollo-fullstack': {
    paragraphs: [
      'Desarrollamos aplicaciones web modernas y de alto rendimiento utilizando las tecnologías más demandadas del mercado. Nuestro stack incluye React, Next.js, Node.js y TypeScript para crear soluciones full stack escalables y mantenibles.',
    ],
    sections: [
      {
        heading: 'Stack Tecnológico',
        items: [
          'Frontend: React, Next.js, TypeScript, Tailwind CSS para interfaces modernas y responsivas',
          'Backend: Node.js, Express, NestJS para APIs RESTful y GraphQL',
          'Bases de datos: PostgreSQL, MongoDB, Redis según necesidades del proyecto',
          'DevOps: Docker, Kubernetes, CI/CD con GitHub Actions o GitLab CI',
          'Cloud: Despliegue en AWS, Vercel, o plataformas de su elección',
        ],
      },
      {
        heading: 'Metodología de Desarrollo',
        paragraph:
          'Aplicamos metodologías ágiles (Scrum/Kanban) con sprints de 2 semanas, code reviews sistemáticos, y testing automatizado.',
      },
    ],
    beneficios: [
      'Aplicaciones web modernas con React y Next.js SSR/SSG',
      'APIs robustas con Node.js y TypeScript para máxima confiabilidad',
      'Diseño responsive y mobile-first para todos los dispositivos',
      'Optimización SEO y rendimiento (Core Web Vitals)',
      'Código limpio, mantenible y escalable con mejores prácticas',
    ],
  },
  'desarrollo-mobile': {
    paragraphs: [
      'Creamos aplicaciones móviles nativas y multiplataforma que ofrecen experiencias de usuario excepcionales. Especializados en React Native y Flutter, desarrollamos apps que funcionan perfectamente en iOS y Android desde un solo código base.',
    ],
    beneficios: [
      'Desarrollo multiplataforma: una app para iOS y Android',
      'Rendimiento nativo con acceso a APIs del dispositivo',
      'Diseño UI/UX moderno siguiendo guías de Apple y Google',
      'Integración con servicios backend y APIs existentes',
      'Publicación y mantenimiento continuo en stores',
    ],
  },
  'desarrollo-java': {
    paragraphs: [
      'Desarrollamos aplicaciones empresariales robustas utilizando Java y frameworks modernos como Spring Boot. Nuestra experiencia abarca desde microservicios hasta aplicaciones monolíticas escalables.',
    ],
    beneficios: [
      'Aplicaciones empresariales robustas y escalables',
      'Microservicios con Spring Boot para arquitecturas modernas',
      'Integración con sistemas legacy y bases de datos existentes',
      'Código limpio y mantenible siguiendo principios SOLID',
      'Testing exhaustivo y documentación técnica completa',
    ],
  },
  'bases-datos': {
    paragraphs: [
      'Optimizamos y gestionamos bases de datos SQL y NoSQL para garantizar alto rendimiento, disponibilidad y seguridad.',
    ],
    beneficios: [
      'Optimización de rendimiento: queries más rápidas y eficientes',
      'Alta disponibilidad con replicación y failover automático',
      'Seguridad avanzada: encriptación, auditoría, y compliance',
      'Escalabilidad horizontal y vertical según necesidades',
      'Monitoreo proactivo y alertas para prevenir problemas',
    ],
  },
  'business-intelligence': {
    paragraphs: [
      'Implementamos soluciones de Business Intelligence con Tableau para transformar datos en insights accionables.',
    ],
    beneficios: [
      'Dashboards interactivos para toma de decisiones en tiempo real',
      'Análisis de datos complejos con visualizaciones intuitivas',
      'Automatización de reportes para ahorro de tiempo',
      'Integración con múltiples fuentes de datos',
      'Capacitación para que su equipo sea autónomo en análisis',
    ],
  },
  wordpress: {
    paragraphs: [
      'Creamos y optimizamos sitios web WordPress personalizados, desde blogs hasta tiendas online completas.',
    ],
    beneficios: [
      'Sitios WordPress rápidos y optimizados (PageSpeed 90+)',
      'Diseño responsive y mobile-first para todos los dispositivos',
      'SEO optimizado para mejor posicionamiento en buscadores',
      'Seguridad avanzada con firewalls y backups automáticos',
      'Mantenimiento continuo y actualizaciones regulares',
    ],
  },
  devops: {
    paragraphs: [
      'Optimizamos sus procesos de desarrollo y operaciones con servicios DevOps completos. Implementamos CI/CD pipelines, automatización de infraestructura, monitoreo y observabilidad.',
    ],
    beneficios: [
      'CI/CD automatizado para despliegues rápidos y seguros',
      'Infraestructura como código para reproducibilidad y versionado',
      'Monitoreo y alertas proactivas para alta disponibilidad',
      'Reducción de errores y rollback automático en caso de problemas',
      'Cultura DevOps para mayor colaboración y eficiencia',
    ],
  },
  'migracion-cloud': {
    paragraphs: [
      'Ejecutamos migraciones completas de infraestructura on-premise a AWS de manera segura y sin downtime.',
    ],
    beneficios: [
      'Migración sin downtime con estrategias de cutover planificadas',
      'Reducción de costos hasta 40% mediante optimización cloud',
      'Mayor escalabilidad y flexibilidad para crecimiento futuro',
      'Mejora de seguridad y compliance con servicios AWS',
      'Soporte completo durante y después de la migración',
    ],
  },
  'capacitacion-aws': {
    paragraphs: [
      'Ofrecemos cursos personalizados y formación en equipo sobre Amazon Web Services. Desde fundamentos hasta certificaciones avanzadas.',
    ],
    beneficios: [
      'Cursos personalizados según necesidades de su equipo',
      'Instructores certificados AWS con experiencia real',
      'Hands-on labs y proyectos prácticos',
      'Preparación para certificaciones AWS oficiales',
      'Material de estudio y seguimiento post-curso',
    ],
  },
}

export function getServiceContent(serviceId: string): ServiceContentBlock {
  return (
    serviceContent[serviceId] ?? {
      paragraphs: [
        `En Cloud Experts, nos especializamos en ${serviceId}, ofreciendo soluciones escalables y eficientes que impulsan el crecimiento de su negocio.`,
      ],
      beneficios: [
        'Más de 20 años de experiencia en proyectos IT empresariales',
        'Certificaciones reconocidas globalmente (AWS, Oracle, Scrum)',
        'Enfoque en resultados y optimización de costos',
        'Servicio personalizado adaptado a sus necesidades',
        'Consultoría remota disponible para toda Argentina',
      ],
    }
  )
}
