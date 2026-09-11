import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.resolve(__dirname, '../src/data/data.json')
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

const BASE_URL = 'https://cloudexperts.com.ar'
const currentDate = new Date().toISOString().split('T')[0]
const distDir = path.resolve(__dirname, '../dist')

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

`

data.services.forEach((service: { name: string; slug: string }) => {
  sitemap += `  <url>
    <loc>${BASE_URL}/servicios/${service.slug}.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

`
})

data.technologies.forEach((tech: { name: string; slug: string }) => {
  sitemap += `  <url>
    <loc>${BASE_URL}/tecnologias/${tech.slug}.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

`
})

data.professionTypes.forEach((prof: { slug: string }) => {
  data.locations.forEach((location: { slug: string }) => {
    sitemap += `  <url>
    <loc>${BASE_URL}/profesionales/${prof.slug}-${location.slug}.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

`
  })
})

data.locations.forEach((location: { slug: string }) => {
  sitemap += `  <url>
    <loc>${BASE_URL}/ubicaciones/${location.slug}.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

`
})

;['servicios', 'tecnologias', 'certificaciones', 'clientes', 'contacto'].forEach((section) => {
  sitemap += `  <url>
    <loc>${BASE_URL}/#${section}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

`
})

sitemap += '</urlset>'

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')
console.log('✅ Sitemap written to dist/sitemap.xml')
