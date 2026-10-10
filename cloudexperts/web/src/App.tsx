import { Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ServicePage } from '@/pages/ServicePage'
import { TechnologyPage } from '@/pages/TechnologyPage'
import { LocationPage } from '@/pages/LocationPage'
import { ProfessionalPage } from '@/pages/ProfessionalPage'
import { PrivacyPage } from '@/pages/PrivacyPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios/:slug.html" element={<ServicePage />} />
      <Route path="/tecnologias/:slug.html" element={<TechnologyPage />} />
      <Route path="/ubicaciones/:slug.html" element={<LocationPage />} />
      <Route path="/profesionales/:slug.html" element={<ProfessionalPage />} />
      <Route path="/privacidad.html" element={<PrivacyPage />} />
    </Routes>
  )
}
