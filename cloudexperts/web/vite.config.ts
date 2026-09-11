import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, type Plugin } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** Dev-only: serve index.html for SEO subpage URLs that end in .html */
function spaSubpageFallback(): Plugin {
  return {
    name: 'spa-subpage-fallback',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, _res, next) => {
          const pathname = req.url?.split('?')[0] ?? ''
          if (
            req.method === 'GET' &&
            /\.html$/.test(pathname) &&
            /^\/(servicios|tecnologias|ubicaciones|profesionales)\//.test(pathname)
          ) {
            req.url = '/index.html'
          }
          next()
        })
      }
    },
  }
}

export default defineConfig({
  appType: 'spa',
  plugins: [react(), tailwindcss(), spaSubpageFallback()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
