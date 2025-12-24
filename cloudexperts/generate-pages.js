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
        url: `${BASE_URL}/servicios/${service.slug}`,
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
                        <li>Más de 20 años de experiencia en proyectos IT empresariales</li>
                        <li>Certificaciones reconocidas globalmente (AWS, Oracle, Scrum)</li>
                        <li>Enfoque en resultados y optimización de costos</li>
                        <li>Servicio personalizado adaptado a sus necesidades</li>
                        <li>Consultoría remota disponible para toda Argentina</li>
                    </ul>
                    
                    <h2 class="text-3xl font-bold text-slate-800 mt-8 mb-4">Nuestro Enfoque</h2>
                    <p class="text-slate-700 leading-relaxed">
                        En Cloud Experts, nos especializamos en ${service.name.toLowerCase()}, ofreciendo soluciones 
                        escalables y eficientes que impulsan el crecimiento de su negocio. Trabajamos con las mejores 
                        prácticas de la industria y tecnologías de vanguardia para garantizar resultados excepcionales.
                    </p>
                    
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
                            <a href="/servicios/${s.slug}" class="tech-card tech-card-3d rounded-xl p-6 block hover:no-underline">
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
        url: `${BASE_URL}/tecnologias/${tech.slug}`,
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
            url: `${BASE_URL}/profesionales/${prof.slug}-${location.slug}`,
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
        url: `${BASE_URL}/ubicaciones/${location.slug}`,
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

