import type { ReactNode } from 'react'
import { WHATSAPP_URL } from '@/data/constants'
import { Navbar, SubpageNavbar } from './Navbar'
import { PageBackground } from './PageBackground'

interface LayoutProps {
  children: ReactNode
  variant?: 'home' | 'subpage'
  scrollVideo?: ReactNode
}

export function Footer() {
  return (
    <footer className="border-t border-white/15 px-5 py-8 sm:px-8 md:px-12">
      <div className="text-center text-sm text-white/60">
        <p>&copy; {new Date().getFullYear()} Cloud Experts. Todos los derechos reservados.</p>
        <p className="mt-2">Ubicación: Escobar, Buenos Aires, Argentina</p>
      </div>
    </footer>
  )
}

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      className="fixed right-4 bottom-4 z-50 rounded-full bg-green-500 p-4 text-white shadow-lg transition-colors duration-300 hover:bg-green-600"
      aria-label="Contactar por WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    </a>
  )
}

export function Layout({ children, variant = 'home', scrollVideo }: LayoutProps) {
  return (
    <>
      {variant === 'home' ? scrollVideo : <PageBackground />}
      <div className="relative z-10 min-h-screen">
        {variant === 'home' ? <Navbar /> : <SubpageNavbar />}
        <main className={variant === 'subpage' ? 'pt-16' : ''}>{children}</main>
        <Footer />
        <WhatsAppFab />
      </div>
    </>
  )
}
