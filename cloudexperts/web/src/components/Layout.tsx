import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
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
        <p className="mt-2">
          <Link to="/privacidad.html" className="underline hover:text-white">
            Política de privacidad
          </Link>
          {' · '}
          Escobar, Buenos Aires, Argentina
        </p>
      </div>
    </footer>
  )
}

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      className="fixed bottom-4 left-4 z-50 rounded-full bg-[#25D366] p-4 text-white shadow-lg transition-colors duration-300 hover:bg-[#1ebe5d]"
      aria-label="Escribinos por WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
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
