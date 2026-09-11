import { ScrollVideo, SCROLL_VIDEO_END_ID } from '@/components/ScrollVideo'
import { Layout } from '@/components/Layout'
import { SectionHero } from '@/components/home/SectionHero'
import { SectionCapability } from '@/components/home/SectionCapability'
import { SectionServicios } from '@/components/home/SectionServicios'
import { SectionTecnologias } from '@/components/home/SectionTecnologias'
import { SectionCertificaciones } from '@/components/home/SectionCertificaciones'
import { SectionClientes } from '@/components/home/SectionClientes'
import { SectionContacto } from '@/components/home/SectionContacto'
import { HomeSeo } from '@/components/seo/HomeSeo'

export function HomePage() {
  return (
    <Layout variant="home" scrollVideo={<ScrollVideo />}>
      <HomeSeo />
      <SectionHero />
      <div className="h-[80vh]" aria-hidden />
      <SectionCapability />
      {/* Scroll-scrub range ends here; video stays fixed and visible below */}
      <div id={SCROLL_VIDEO_END_ID} aria-hidden className="h-0 w-full" />
      <SectionServicios />
      <SectionTecnologias />
      <SectionCertificaciones />
      <SectionClientes />
      <SectionContacto />
    </Layout>
  )
}
