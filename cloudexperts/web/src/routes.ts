import { locations, professionTypes, services, technologies } from '@/data'

export interface RouteDefinition {
  path: string
  outputPath: string
}

export function getAllRoutes(): RouteDefinition[] {
  const routes: RouteDefinition[] = [{ path: '/', outputPath: 'index.html' }]

  services.forEach((s) => {
    routes.push({
      path: `/servicios/${s.slug}.html`,
      outputPath: `servicios/${s.slug}.html`,
    })
  })

  technologies.forEach((t) => {
    routes.push({
      path: `/tecnologias/${t.slug}.html`,
      outputPath: `tecnologias/${t.slug}.html`,
    })
  })

  locations.forEach((l) => {
    routes.push({
      path: `/ubicaciones/${l.slug}.html`,
      outputPath: `ubicaciones/${l.slug}.html`,
    })
  })

  professionTypes.forEach((p) => {
    locations.forEach((l) => {
      routes.push({
        path: `/profesionales/${p.slug}-${l.slug}.html`,
        outputPath: `profesionales/${p.slug}-${l.slug}.html`,
      })
    })
  })

  return routes
}
