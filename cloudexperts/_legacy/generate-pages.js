#!/usr/bin/env node
/**
 * Programmatic SEO Page Generator
 * Generates dynamic pages for services, technologies, locations, and profession types
 */

const fs = require('fs');
const path = require('path');

// Load data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

// Base URL
const BASE_URL = 'https://cloudexperts.com.ar';

// Helper function to generate meta tags
function generateMetaTags(page) {
    return `
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <meta name="keywords" content="${page.keywords.join(', ')}">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:url" content="${page.url}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.description}">
    <link rel="canonical" href="${page.url}">`;
}

// Helper function to generate structured data
function generateStructuredData(page) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": page.schemaType || "Service",
        "name": page.title,
        "description": page.description,
        "url": page.url,
        "provider": {
            "@type": "Organization",
            "name": "Cloud Experts",
            "url": BASE_URL,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Escobar",
                "addressRegion": "Buenos Aires",
                "addressCountry": "Argentina"
            }
        }
    };

    if (page.serviceArea) {
        structuredData.areaServed = {
            "@type": "Country",
            "name": page.serviceArea
        };
    }

    return JSON.stringify(structuredData, null, 2);
}

// Helper function to generate service-specific content
function generateServiceContent(serviceId) {
    const contentMap = {
        'arquitectura-aws': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    En Cloud Experts, diseñamos arquitecturas AWS escalables, seguras y optimizadas para costos. 
                    Nuestro enfoque se basa en las mejores prácticas de AWS Well-Architected Framework, 
                    garantizando soluciones que crecen con su negocio.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Servicios que Ofrecemos</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>Diseño de arquitecturas cloud:</strong> EC2, Lambda, ECS, EKS para aplicaciones escalables</li>
                    <li><strong>Almacenamiento y bases de datos:</strong> S3, RDS, DynamoDB, ElastiCache optimizados</li>
                    <li><strong>Redes y seguridad:</strong> VPC, Security Groups, WAF, CloudFront para máxima protección</li>
                    <li><strong>Automatización:</strong> CloudFormation, Terraform, CDK para infraestructura como código</li>
                    <li><strong>Monitoreo y optimización:</strong> CloudWatch, X-Ray, Cost Explorer para rendimiento y costos</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Beneficios Clave</h3>
                <p class="text-slate-700 leading-relaxed">
                    Nuestras arquitecturas AWS reducen costos hasta un 40% mediante optimización de recursos, 
                    mejoran la disponibilidad con diseños multi-AZ, y aceleran el time-to-market con CI/CD automatizado. 
                    Trabajamos con certificaciones AWS Solutions Architect para garantizar soluciones de clase empresarial.
                </p>
            `,
            beneficios: [
                'Arquitecturas escalables desde el día uno con auto-scaling',
                'Reducción de costos mediante análisis y optimización continua',
                'Seguridad de nivel empresarial con compliance (SOC 2, ISO 27001)',
                'Alta disponibilidad con diseños multi-región y disaster recovery',
                'Automatización completa con Infrastructure as Code (IaC)'
            ]
        },
        'desarrollo-fullstack': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Desarrollamos aplicaciones web modernas y de alto rendimiento utilizando las tecnologías más 
                    demandadas del mercado. Nuestro stack incluye React, Next.js, Node.js y TypeScript para crear 
                    soluciones full stack escalables y mantenibles.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Stack Tecnológico</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS para interfaces modernas y responsivas</li>
                    <li><strong>Backend:</strong> Node.js, Express, NestJS para APIs RESTful y GraphQL</li>
                    <li><strong>Bases de datos:</strong> PostgreSQL, MongoDB, Redis según necesidades del proyecto</li>
                    <li><strong>DevOps:</strong> Docker, Kubernetes, CI/CD con GitHub Actions o GitLab CI</li>
                    <li><strong>Cloud:</strong> Despliegue en AWS, Vercel, o plataformas de su elección</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Metodología de Desarrollo</h3>
                <p class="text-slate-700 leading-relaxed">
                    Aplicamos metodologías ágiles (Scrum/Kanban) con sprints de 2 semanas, code reviews sistemáticos, 
                    y testing automatizado. Utilizamos TypeScript para mayor seguridad de tipos y mantenibilidad del código. 
                    Todas nuestras aplicaciones son mobile-first, SEO-friendly, y optimizadas para rendimiento.
                </p>
            `,
            beneficios: [
                'Aplicaciones web modernas con React y Next.js SSR/SSG',
                'APIs robustas con Node.js y TypeScript para máxima confiabilidad',
                'Diseño responsive y mobile-first para todos los dispositivos',
                'Optimización SEO y rendimiento (Core Web Vitals)',
                'Código limpio, mantenible y escalable con mejores prácticas'
            ]
        },
        'desarrollo-mobile': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Creamos aplicaciones móviles nativas y multiplataforma que ofrecen experiencias de usuario excepcionales. 
                    Especializados en React Native y Flutter, desarrollamos apps que funcionan perfectamente en iOS y Android 
                    desde un solo código base.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Tecnologías y Plataformas</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>React Native:</strong> Desarrollo multiplataforma con JavaScript/TypeScript</li>
                    <li><strong>Flutter:</strong> Apps nativas de alto rendimiento con Dart</li>
                    <li><strong>APIs y Backend:</strong> Integración con REST APIs, GraphQL, Firebase</li>
                    <li><strong>Funcionalidades:</strong> Push notifications, autenticación, pagos in-app, geolocalización</li>
                    <li><strong>Publicación:</strong> Gestión completa en App Store y Google Play Store</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Proceso de Desarrollo</h3>
                <p class="text-slate-700 leading-relaxed">
                    Seguimos un proceso iterativo que incluye diseño UX/UI, desarrollo ágil, testing en dispositivos reales, 
                    y publicación en stores. Nuestras apps cumplen con las guías de diseño de Apple (Human Interface Guidelines) 
                    y Material Design de Google. Ofrecemos mantenimiento continuo y actualizaciones post-lanzamiento.
                </p>
            `,
            beneficios: [
                'Desarrollo multiplataforma: una app para iOS y Android',
                'Rendimiento nativo con acceso a APIs del dispositivo',
                'Diseño UI/UX moderno siguiendo guías de Apple y Google',
                'Integración con servicios backend y APIs existentes',
                'Publicación y mantenimiento continuo en stores'
            ]
        },
        'desarrollo-java': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Desarrollamos aplicaciones empresariales robustas utilizando Java y frameworks modernos como Spring Boot. 
                    Nuestra experiencia abarca desde microservicios hasta aplicaciones monolíticas escalables, siempre 
                    siguiendo las mejores prácticas de la industria.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Tecnologías Java</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>Frameworks:</strong> Spring Boot, Spring Framework, Spring Security, Spring Data JPA</li>
                    <li><strong>Arquitectura:</strong> Microservicios, REST APIs, GraphQL, arquitectura hexagonal</li>
                    <li><strong>Bases de datos:</strong> Oracle, MySQL, PostgreSQL, MongoDB con JPA/Hibernate</li>
                    <li><strong>DevOps:</strong> Maven, Gradle, Docker, Kubernetes para despliegue</li>
                    <li><strong>Testing:</strong> JUnit, Mockito, TestContainers para testing automatizado</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Casos de Uso</h3>
                <p class="text-slate-700 leading-relaxed">
                    Desarrollamos sistemas empresariales complejos: plataformas de e-commerce, sistemas de gestión (ERP/CRM), 
                    APIs para integración de sistemas legacy, y aplicaciones financieras. Nuestro código es mantenible, 
                    escalable, y sigue principios SOLID. Implementamos patrones de diseño probados y arquitecturas limpias 
                    que facilitan el crecimiento futuro.
                </p>
            `,
            beneficios: [
                'Aplicaciones empresariales robustas y escalables',
                'Microservicios con Spring Boot para arquitecturas modernas',
                'Integración con sistemas legacy y bases de datos existentes',
                'Código limpio y mantenible siguiendo principios SOLID',
                'Testing exhaustivo y documentación técnica completa'
            ]
        },
        'bases-datos': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Optimizamos y gestionamos bases de datos SQL y NoSQL para garantizar alto rendimiento, disponibilidad 
                    y seguridad. Nuestra experiencia incluye diseño de esquemas, optimización de queries, tuning de 
                    performance, y estrategias de backup y recovery.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Bases de Datos que Gestionamos</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>SQL:</strong> Oracle, MySQL, PostgreSQL, SQL Server - optimización y tuning avanzado</li>
                    <li><strong>NoSQL:</strong> MongoDB, DynamoDB, Redis, Cassandra para casos de uso específicos</li>
                    <li><strong>Cloud:</strong> AWS RDS, Aurora, Redshift, DocumentDB para soluciones escalables</li>
                    <li><strong>Migración:</strong> Migración de bases de datos on-premise a cloud</li>
                    <li><strong>Backup y Recovery:</strong> Estrategias de backup automatizado y disaster recovery</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Servicios de Optimización</h3>
                <p class="text-slate-700 leading-relaxed">
                    Realizamos análisis profundo de rendimiento, optimización de índices, normalización de esquemas, 
                    y tuning de queries complejas. Implementamos estrategias de particionamiento, replicación, y 
                    sharding para bases de datos de gran escala. Ofrecemos monitoreo 24/7 y alertas proactivas para 
                    prevenir problemas antes de que afecten a los usuarios.
                </p>
            `,
            beneficios: [
                'Optimización de rendimiento: queries más rápidas y eficientes',
                'Alta disponibilidad con replicación y failover automático',
                'Seguridad avanzada: encriptación, auditoría, y compliance',
                'Escalabilidad horizontal y vertical según necesidades',
                'Monitoreo proactivo y alertas para prevenir problemas'
            ]
        },
        'business-intelligence': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Implementamos soluciones de Business Intelligence con Tableau para transformar datos en insights 
                    accionables. Creamos dashboards interactivos, reportes automatizados, y análisis avanzados que 
                    ayudan a las empresas a tomar decisiones basadas en datos.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Servicios de BI</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>Tableau:</strong> Dashboards interactivos, visualizaciones avanzadas, y análisis ad-hoc</li>
                    <li><strong>ETL y Data Warehousing:</strong> Preparación y transformación de datos para análisis</li>
                    <li><strong>Integración:</strong> Conexión con múltiples fuentes de datos (SQL, APIs, Excel, cloud)</li>
                    <li><strong>Reportes Automatizados:</strong> Generación y distribución automática de reportes</li>
                    <li><strong>Capacitación:</strong> Entrenamiento para equipos en Tableau y análisis de datos</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Casos de Uso</h3>
                <p class="text-slate-700 leading-relaxed">
                    Desarrollamos dashboards ejecutivos para KPIs, análisis de ventas y marketing, seguimiento de 
                    operaciones en tiempo real, y reportes financieros automatizados. Nuestras soluciones permiten 
                    identificar tendencias, detectar anomalías, y predecir comportamientos futuros mediante análisis 
                    predictivo. Todo esto con visualizaciones intuitivas que facilitan la comprensión de datos complejos.
                </p>
            `,
            beneficios: [
                'Dashboards interactivos para toma de decisiones en tiempo real',
                'Análisis de datos complejos con visualizaciones intuitivas',
                'Automatización de reportes para ahorro de tiempo',
                'Integración con múltiples fuentes de datos',
                'Capacitación para que su equipo sea autónomo en análisis'
            ]
        },
        'wordpress': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Creamos y optimizamos sitios web WordPress personalizados, desde blogs hasta tiendas online complejas. 
                    Ofrecemos desarrollo de temas custom, plugins personalizados, optimización de rendimiento, y hosting 
                    especializado en WordPress.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Servicios WordPress</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>Desarrollo Custom:</strong> Temas y plugins personalizados según sus necesidades</li>
                    <li><strong>WooCommerce:</strong> Tiendas online completas con pasarelas de pago integradas</li>
                    <li><strong>Optimización:</strong> Velocidad, SEO, y seguridad para máximo rendimiento</li>
                    <li><strong>Migración:</strong> Migración de sitios existentes a WordPress o entre servidores</li>
                    <li><strong>Hosting y Mantenimiento:</strong> Hosting optimizado y mantenimiento continuo</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Optimización y Seguridad</h3>
                <p class="text-slate-700 leading-relaxed">
                    Optimizamos sus sitios WordPress para velocidad (PageSpeed 90+), SEO (on-page y técnico), y seguridad 
                    (firewalls, actualizaciones, backups). Implementamos caching avanzado, CDN, y optimización de imágenes. 
                    Todos nuestros sitios son responsive, accesibles (WCAG), y compatibles con las últimas versiones de WordPress.
                </p>
            `,
            beneficios: [
                'Sitios WordPress rápidos y optimizados (PageSpeed 90+)',
                'Diseño responsive y mobile-first para todos los dispositivos',
                'SEO optimizado para mejor posicionamiento en buscadores',
                'Seguridad avanzada con firewalls y backups automáticos',
                'Mantenimiento continuo y actualizaciones regulares'
            ]
        },
        'devops': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Optimizamos sus procesos de desarrollo y operaciones con servicios DevOps completos. Implementamos 
                    CI/CD pipelines, automatización de infraestructura, monitoreo y observabilidad, y cultura DevOps 
                    en su organización.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Servicios DevOps</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>CI/CD:</strong> Pipelines automatizados con Jenkins, GitLab CI, GitHub Actions, o AWS CodePipeline</li>
                    <li><strong>Contenedores:</strong> Docker y Kubernetes para orquestación y escalabilidad</li>
                    <li><strong>Infrastructure as Code:</strong> Terraform, CloudFormation, Ansible para automatización</li>
                    <li><strong>Monitoreo:</strong> CloudWatch, Prometheus, Grafana para observabilidad completa</li>
                    <li><strong>Seguridad:</strong> DevSecOps con análisis de código, escaneo de vulnerabilidades</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Beneficios del Enfoque DevOps</h3>
                <p class="text-slate-700 leading-relaxed">
                    Nuestras implementaciones DevOps reducen el time-to-market en un 50%, mejoran la calidad del código 
                    con testing automatizado, y aumentan la confiabilidad con despliegues frecuentes y seguros. 
                    Implementamos cultura DevOps, breaking down silos entre desarrollo y operaciones para mayor colaboración.
                </p>
            `,
            beneficios: [
                'CI/CD automatizado para despliegues rápidos y seguros',
                'Infraestructura como código para reproducibilidad y versionado',
                'Monitoreo y alertas proactivas para alta disponibilidad',
                'Reducción de errores y rollback automático en caso de problemas',
                'Cultura DevOps para mayor colaboración y eficiencia'
            ]
        },
        'migracion-cloud': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Ejecutamos migraciones completas de infraestructura on-premise a AWS de manera segura y sin downtime. 
                    Nuestro proceso incluye evaluación, planificación, ejecución y optimización post-migración para 
                    garantizar el éxito del proyecto.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Proceso de Migración</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>Evaluación:</strong> Análisis de infraestructura actual, dependencias y costos</li>
                    <li><strong>Planificación:</strong> Estrategia de migración (rehost, replatform, refactor) según necesidades</li>
                    <li><strong>Ejecución:</strong> Migración por fases con testing continuo y rollback plan</li>
                    <li><strong>Optimización:</strong> Right-sizing, reservas, y optimización de costos post-migración</li>
                    <li><strong>Soporte:</strong> Capacitación y documentación para su equipo</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Estrategias de Migración</h3>
                <p class="text-slate-700 leading-relaxed">
                    Utilizamos el framework AWS Migration Hub y las 7 R's de migración (Rehost, Replatform, Repurchase, 
                    Refactor, Retire, Retain, Relocate). Aplicamos lift-and-shift cuando es apropiado, o modernización 
                    completa según objetivos del negocio. Todas las migraciones incluyen disaster recovery y backup 
                    strategies para máxima resiliencia.
                </p>
            `,
            beneficios: [
                'Migración sin downtime con estrategias de cutover planificadas',
                'Reducción de costos hasta 40% mediante optimización cloud',
                'Mayor escalabilidad y flexibilidad para crecimiento futuro',
                'Mejora de seguridad y compliance con servicios AWS',
                'Soporte completo durante y después de la migración'
            ]
        },
        'capacitacion-aws': {
            enfoque: `
                <p class="text-slate-700 leading-relaxed mb-4">
                    Ofrecemos cursos personalizados y formación en equipo sobre Amazon Web Services. Desde fundamentos 
                    hasta certificaciones avanzadas, adaptamos el contenido a las necesidades de su organización y 
                    nivel de conocimiento de su equipo.
                </p>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Programas de Capacitación</h3>
                <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li><strong>Fundamentos AWS:</strong> Introducción a servicios core (EC2, S3, RDS, Lambda)</li>
                    <li><strong>Certificaciones:</strong> Preparación para Solutions Architect, Developer, SysOps</li>
                    <li><strong>Arquitectura:</strong> AWS Well-Architected Framework y mejores prácticas</li>
                    <li><strong>Hands-on Labs:</strong> Práctica con proyectos reales en ambiente AWS</li>
                    <li><strong>Capacitación In-Company:</strong> Cursos personalizados en su organización</li>
                </ul>
                <h3 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Metodología de Enseñanza</h3>
                <p class="text-slate-700 leading-relaxed">
                    Combinamos teoría con práctica intensiva. Cada sesión incluye ejercicios hands-on, casos de uso reales, 
                    y acceso a laboratorios AWS. Proporcionamos material de estudio, exámenes de práctica, y seguimiento 
                    post-curso. Nuestros instructores son AWS Certified con años de experiencia implementando soluciones 
                    en producción.
                </p>
            `,
            beneficios: [
                'Cursos personalizados según necesidades de su equipo',
                'Instructores certificados AWS con experiencia real',
                'Hands-on labs y proyectos prácticos',
                'Preparación para certificaciones AWS oficiales',
                'Material de estudio y seguimiento post-curso'
            ]
        }
    };

    return contentMap[serviceId] || {
        enfoque: `
            <p class="text-slate-700 leading-relaxed">
                En Cloud Experts, nos especializamos en ${serviceId}, ofreciendo soluciones 
                escalables y eficientes que impulsan el crecimiento de su negocio. Trabajamos con las mejores 
                prácticas de la industria y tecnologías de vanguardia para garantizar resultados excepcionales.
            </p>
        `,
        beneficios: [
            'Soluciones escalables y eficientes',
            'Mejores prácticas de la industria',
            'Tecnologías de vanguardia',
            'Resultados excepcionales',
            'Servicio personalizado'
        ]
    };
}

// Read base template
const baseTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'base.html'), 'utf8');

// Create directories
const dirs = ['servicios', 'tecnologias', 'profesionales', 'ubicaciones'];
dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

// Generate service pages
data.services.forEach(service => {
    const page = {
        title: `${service.name} - Cloud Experts | Consultoría IT Profesional Argentina`,
        description: `${service.description}. Más de 20 años de experiencia. Servicios profesionales en Argentina.`,
        keywords: [...service.keywords, 'cloud experts', 'consultoría it argentina', 'it professionals argentina'],
        url: `${BASE_URL}/servicios/${service.slug}.html`,
        schemaType: "Service",
        serviceArea: "Argentina"
    };

    // Get service-specific content
    const serviceContent = generateServiceContent(service.id);
    const beneficios = serviceContent.beneficios || [
        'Más de 20 años de experiencia en proyectos IT empresariales',
        'Certificaciones reconocidas globalmente (AWS, Oracle, Scrum)',
        'Enfoque en resultados y optimización de costos',
        'Servicio personalizado adaptado a sus necesidades',
        'Consultoría remota disponible para toda Argentina'
    ];

    const content = `
        <section class="py-20 px-4 container mx-auto">
            <div class="max-w-4xl mx-auto">
                <nav class="mb-8 text-sm" aria-label="Breadcrumb">
                    <ol class="flex space-x-2">
                        <li><a href="/" class="text-blue-600 hover:text-blue-800">Inicio</a></li>
                        <li class="text-slate-500">/</li>
                        <li><a href="/#servicios" class="text-blue-600 hover:text-blue-800">Servicios</a></li>
                        <li class="text-slate-500">/</li>
                        <li class="text-slate-700">${service.name}</li>
                    </ol>
                </nav>
                
                <h1 class="text-4xl md:text-6xl font-black mb-6 text-slate-800">
                    <span class="text-gradient">${service.name}</span>
                </h1>
                
                <div class="prose prose-lg max-w-none mb-12">
                    <p class="text-xl text-slate-700 leading-relaxed mb-6">
                        ${service.description}
                    </p>
                    
                    <h2 class="text-3xl font-bold text-slate-800 mt-8 mb-4">¿Por qué elegir Cloud Experts?</h2>
                    <ul class="list-disc list-inside space-y-2 text-slate-700">
                        ${beneficios.map(beneficio => `<li>${beneficio}</li>`).join('')}
                    </ul>
                    
                    <h2 class="text-3xl font-bold text-slate-800 mt-8 mb-4">Nuestro Enfoque</h2>
                    ${serviceContent.enfoque}
                    
                    <div class="mt-8">
                        <a href="/#contacto" class="btn-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg inline-block">
                            Solicitar Consultoría Gratuita
                        </a>
                    </div>
                </div>
                
                <div class="mt-12">
                    <h2 class="text-2xl font-bold text-slate-800 mb-6">Servicios Relacionados</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${data.services.filter(s => s.id !== service.id).slice(0, 4).map(s => `
                            <a href="/servicios/${s.slug}.html" class="tech-card tech-card-3d rounded-xl p-6 block hover:no-underline">
                                <h3 class="text-xl font-bold text-slate-800 mb-2">${s.name}</h3>
                                <p class="text-slate-700">${s.description}</p>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;

    const html = baseTemplate
        .replace('{{META_TAGS}}', generateMetaTags(page))
        .replace('{{STRUCTURED_DATA}}', generateStructuredData(page))
        .replace('{{CONTENT}}', content)
        .replace('{{CANONICAL}}', page.url);

    fs.writeFileSync(
        path.join(__dirname, 'servicios', `${service.slug}.html`),
        html,
        'utf8'
    );
});

// Generate technology pages
data.technologies.forEach(tech => {
    const page = {
        title: `Experto en ${tech.name} - Cloud Experts | Consultoría IT Argentina`,
        description: `Consultoría especializada en ${tech.name}. ${tech.description}. Más de 20 años de experiencia.`,
        keywords: [...tech.keywords, 'cloud experts', 'consultoría it argentina'],
        url: `${BASE_URL}/tecnologias/${tech.slug}.html`,
        schemaType: "Service",
        serviceArea: "Argentina"
    };

    const content = `
        <section class="py-20 px-4 container mx-auto">
            <div class="max-w-4xl mx-auto">
                <nav class="mb-8 text-sm" aria-label="Breadcrumb">
                    <ol class="flex space-x-2">
                        <li><a href="/" class="text-blue-600 hover:text-blue-800">Inicio</a></li>
                        <li class="text-slate-500">/</li>
                        <li><a href="/#tecnologias" class="text-blue-600 hover:text-blue-800">Tecnologías</a></li>
                        <li class="text-slate-500">/</li>
                        <li class="text-slate-700">${tech.name}</li>
                    </ol>
                </nav>
                
                <h1 class="text-4xl md:text-6xl font-black mb-6 text-slate-800">
                    <span class="text-gradient">Experto en ${tech.name}</span>
                </h1>
                
                <div class="prose prose-lg max-w-none mb-12">
                    <p class="text-xl text-slate-700 leading-relaxed mb-6">
                        ${tech.description}. En Cloud Experts, contamos con amplia experiencia en ${tech.name}, 
                        ofreciendo soluciones profesionales para empresas en Argentina y Latinoamérica.
                    </p>
                    
                    <h2 class="text-3xl font-bold text-slate-800 mt-8 mb-4">Nuestra Experiencia con ${tech.name}</h2>
                    <p class="text-slate-700 leading-relaxed">
                        Con más de 20 años de experiencia en el sector IT, hemos trabajado extensivamente con ${tech.name}, 
                        implementando soluciones robustas y escalables para empresas de todos los tamaños. Nuestro equipo 
                        certificado garantiza resultados de alta calidad.
                    </p>
                    
                    <div class="mt-8">
                        <a href="/#contacto" class="btn-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg inline-block">
                            Consultar sobre ${tech.name}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;

    const html = baseTemplate
        .replace('{{META_TAGS}}', generateMetaTags(page))
        .replace('{{STRUCTURED_DATA}}', generateStructuredData(page))
        .replace('{{CONTENT}}', content)
        .replace('{{CANONICAL}}', page.url);

    fs.writeFileSync(
        path.join(__dirname, 'tecnologias', `${tech.slug}.html`),
        html,
        'utf8'
    );
});

// Generate profession type pages
data.professionTypes.forEach(prof => {
    data.locations.forEach(location => {
        const page = {
            title: `${prof.name} en ${location.name} - Cloud Experts | IT Professionals Argentina`,
            description: `${prof.name} en ${location.name}. Consultoría IT profesional con más de 20 años de experiencia. Servicios especializados en ${location.name}, Argentina.`,
            keywords: [...prof.keywords, ...location.keywords, 'cloud experts', 'consultoría it'],
            url: `${BASE_URL}/profesionales/${prof.slug}-${location.slug}.html`,
            schemaType: "Person",
            serviceArea: location.name
        };

        const content = `
            <section class="py-20 px-4 container mx-auto">
                <div class="max-w-4xl mx-auto">
                    <nav class="mb-8 text-sm" aria-label="Breadcrumb">
                        <ol class="flex space-x-2">
                            <li><a href="/" class="text-blue-600 hover:text-blue-800">Inicio</a></li>
                            <li class="text-slate-500">/</li>
                            <li class="text-slate-700">${prof.name} en ${location.name}</li>
                        </ol>
                    </nav>
                    
                    <h1 class="text-4xl md:text-6xl font-black mb-6 text-slate-800">
                        <span class="text-gradient">${prof.name} en ${location.name}</span>
                    </h1>
                    
                    <div class="prose prose-lg max-w-none mb-12">
                        <p class="text-xl text-slate-700 leading-relaxed mb-6">
                            Busca un ${prof.name.toLowerCase()} en ${location.name}? Cloud Experts ofrece servicios 
                            profesionales de consultoría IT con más de 20 años de experiencia. Especializados en AWS, 
                            Java, DevOps y migración a la nube.
                        </p>
                        
                        <h2 class="text-3xl font-bold text-slate-800 mt-8 mb-4">¿Por qué elegir Cloud Experts?</h2>
                        <ul class="list-disc list-inside space-y-2 text-slate-700">
                            <li>Certificaciones reconocidas (AWS, Oracle, Scrum Master)</li>
                            <li>Más de 20 años de experiencia en proyectos empresariales</li>
                            <li>Servicios remotos disponibles para empresas en ${location.name}</li>
                            <li>Enfoque en resultados y optimización de costos</li>
                            <li>Consultoría inicial gratuita sin compromiso</li>
                        </ul>
                        
                        <div class="mt-8">
                            <a href="/#contacto" class="btn-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg inline-block">
                                Contactar ${prof.name}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;

        const html = baseTemplate
            .replace('{{META_TAGS}}', generateMetaTags(page))
            .replace('{{STRUCTURED_DATA}}', generateStructuredData(page))
            .replace('{{CONTENT}}', content)
            .replace('{{CANONICAL}}', page.url);

        fs.writeFileSync(
            path.join(__dirname, 'profesionales', `${prof.slug}-${location.slug}.html`),
            html,
            'utf8'
        );
    });
});

// Generate location pages
data.locations.forEach(location => {
    const page = {
        title: `IT Professionals en ${location.name} - Cloud Experts | Consultoría IT`,
        description: `Consultoría IT profesional en ${location.name}. Especialistas en AWS, Java, DevOps. Más de 20 años de experiencia. Servicios remotos disponibles.`,
        keywords: [...location.keywords, 'cloud experts', 'consultoría it'],
        url: `${BASE_URL}/ubicaciones/${location.slug}.html`,
        schemaType: "LocalBusiness",
        serviceArea: location.name
    };

    const content = `
        <section class="py-20 px-4 container mx-auto">
            <div class="max-w-4xl mx-auto">
                <nav class="mb-8 text-sm" aria-label="Breadcrumb">
                    <ol class="flex space-x-2">
                        <li><a href="/" class="text-blue-600 hover:text-blue-800">Inicio</a></li>
                        <li class="text-slate-500">/</li>
                        <li class="text-slate-700">${location.name}</li>
                    </ol>
                </nav>
                
                <h1 class="text-4xl md:text-6xl font-black mb-6 text-slate-800">
                    <span class="text-gradient">IT Professionals en ${location.name}</span>
                </h1>
                
                <div class="prose prose-lg max-w-none mb-12">
                    <p class="text-xl text-slate-700 leading-relaxed mb-6">
                        Cloud Experts ofrece servicios de consultoría IT profesional para empresas en ${location.name}. 
                        Especializados en AWS, desarrollo Java, DevOps y migración a la nube. Más de 20 años de experiencia.
                    </p>
                    
                    <h2 class="text-3xl font-bold text-slate-800 mt-8 mb-4">Servicios en ${location.name}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        ${data.services.slice(0, 6).map(s => `
                            <div class="tech-card rounded-xl p-6">
                                <h3 class="text-xl font-bold text-slate-800 mb-2">${s.name}</h3>
                                <p class="text-slate-700">${s.description}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="mt-8">
                        <a href="/#contacto" class="btn-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg inline-block">
                            Consultoría Gratuita en ${location.name}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;

    const html = baseTemplate
        .replace('{{META_TAGS}}', generateMetaTags(page))
        .replace('{{STRUCTURED_DATA}}', generateStructuredData(page))
        .replace('{{CONTENT}}', content)
        .replace('{{CANONICAL}}', page.url);

    fs.writeFileSync(
        path.join(__dirname, 'ubicaciones', `${location.slug}.html`),
        html,
        'utf8'
    );
});

console.log('✅ Programmatic SEO pages generated successfully!');
console.log(`   - ${data.services.length} service pages`);
console.log(`   - ${data.technologies.length} technology pages`);
console.log(`   - ${data.professionTypes.length * data.locations.length} profession-location pages`);
console.log(`   - ${data.locations.length} location pages`);

