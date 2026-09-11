import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

/** React 19 renders title/meta in body; hoist them into head for static HTML. */
function extractHeadTags(html: string): { headTags: string; bodyHtml: string } {
  let remaining = html
  const headTags: string[] = []

  const patterns: RegExp[] = [
    /^<link\b[^>]*\/?>/i,
    /^<script\b[^>]*>[\s\S]*?<\/script>/i,
    /^<title\b[^>]*>[\s\S]*?<\/title>/i,
    /^<meta\b[^>]*\/?>/i,
    /^<noscript\b[^>]*>[\s\S]*?<\/noscript>/i,
  ]

  let progress = true
  while (progress) {
    progress = false
    remaining = remaining.trimStart()
    for (const pattern of patterns) {
      const match = remaining.match(pattern)
      if (match) {
        headTags.push(match[0])
        remaining = remaining.slice(match[0].length)
        progress = true
        break
      }
    }
  }

  return { headTags: headTags.join('\n    '), bodyHtml: remaining }
}

async function main() {
  const distDir = path.join(projectRoot, 'dist')
  const templatePath = path.join(distDir, 'index.html')

  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Run vite build first.')
    process.exit(1)
  }

  const template = fs.readFileSync(templatePath, 'utf8')

  const vite = await createServer({
    root: projectRoot,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
    const { getAllRoutes } = await vite.ssrLoadModule('/src/routes.ts')
    const routes = getAllRoutes()

    for (const route of routes) {
      const { html } = render(route.path)
      const { headTags, bodyHtml } = extractHeadTags(html)

      let page = template

      if (headTags) {
        page = page.replace('</head>', `    ${headTags}\n  </head>`)
        // Remove placeholder title when page-specific title was injected
        const pageTitle = headTags.match(/<title[^>]*>[\s\S]*?<\/title>/i)
        if (pageTitle) {
          page = page.replace(/<title>Cloud Experts<\/title>\s*/, '')
        }
      }

      page = page.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)

      const outFile = path.join(distDir, route.outputPath)
      fs.mkdirSync(path.dirname(outFile), { recursive: true })
      fs.writeFileSync(outFile, page, 'utf8')
      console.log(`  ✓ ${route.outputPath}`)
    }

    console.log(`\n✅ Prerendered ${routes.length} pages`)
  } finally {
    await vite.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
