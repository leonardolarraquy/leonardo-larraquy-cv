#!/usr/bin/env node
/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml with all programmatic SEO pages
 */

const fs = require('fs');
const path = require('path');

// Load data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

const BASE_URL = 'https://cloudexperts.com.ar';
const currentDate = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

`;

// Add service pages
data.services.forEach(service => {
    sitemap += `  <!-- Service: ${service.name} -->
  <url>
    <loc>${BASE_URL}/servicios/${service.slug}.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

`;
});

// Add technology pages
data.technologies.forEach(tech => {
    sitemap += `  <!-- Technology: ${tech.name} -->
  <url>
    <loc>${BASE_URL}/tecnologias/${tech.slug}.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

`;
});

// Add profession-location pages
data.professionTypes.forEach(prof => {
    data.locations.forEach(location => {
        sitemap += `  <!-- ${prof.name} in ${location.name} -->
  <url>
    <loc>${BASE_URL}/profesionales/${prof.slug}-${location.slug}.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

`;
    });
});

// Add location pages
data.locations.forEach(location => {
    sitemap += `  <!-- Location: ${location.name} -->
  <url>
    <loc>${BASE_URL}/ubicaciones/${location.slug}.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

`;
});

// Add section anchors
const sections = [
    { id: 'servicios', priority: 0.9 },
    { id: 'tecnologias', priority: 0.8 },
    { id: 'certificaciones', priority: 0.9 },
    { id: 'clientes', priority: 0.7 },
    { id: 'contacto', priority: 0.9 }
];

sections.forEach(section => {
    sitemap += `  <!-- Section: ${section.id} -->
  <url>
    <loc>${BASE_URL}/#${section.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${section.priority}</priority>
  </url>

`;
});

sitemap += '</urlset>';

// Write sitemap
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');

console.log('✅ Sitemap generated successfully!');
console.log(`   - 1 homepage`);
console.log(`   - ${data.services.length} service pages`);
console.log(`   - ${data.technologies.length} technology pages`);
console.log(`   - ${data.professionTypes.length * data.locations.length} profession-location pages`);
console.log(`   - ${data.locations.length} location pages`);
console.log(`   - ${sections.length} section anchors`);
console.log(`   Total: ${1 + data.services.length + data.technologies.length + (data.professionTypes.length * data.locations.length) + data.locations.length + sections.length} URLs`);

