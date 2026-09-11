import { renderToString } from 'react-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './App'

export function render(url: string): { html: string; helmet?: HelmetServerState } {
  const helmetContext: { helmet?: HelmetServerState } = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  )

  return { html, helmet: helmetContext.helmet }
}
