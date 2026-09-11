import { Cloud } from 'lucide-react'
import { RevealOnScroll } from './RevealOnScroll'
import { services } from '@/data'

const navLinks = [
  { href: '#servicios', label: 'Servicios', count: services.length },
  { href: '#tecnologias', label: 'Tecnologías' },
  { href: '#certificaciones', label: 'Certificaciones' },
  { href: '#clientes', label: 'Clientes' },
]

export function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/15">
      <nav className="flex h-16 items-center justify-between px-5 sm:px-8 md:px-12">
        <RevealOnScroll delay={0}>
          <a
            href="/"
            className="flex items-center gap-2 text-lg font-medium tracking-tight text-white sm:text-xl"
          >
            <Cloud size={24} strokeWidth={1.5} />
            cloud experts
          </a>
        </RevealOnScroll>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link, i) => (
            <RevealOnScroll key={link.href} delay={100 + i * 100}>
              <a
                href={link.href}
                className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                {link.count != null && (
                  <sup className="ml-0.5 font-mono text-[10px] text-white/60">
                    {link.count}
                  </sup>
                )}
              </a>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={500}>
          <a
            href="#contacto"
            className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            Contactar
          </a>
        </RevealOnScroll>
      </nav>
    </header>
  )
}

export function SubpageNavbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/15">
      <nav className="flex h-16 items-center justify-between px-5 sm:px-8 md:px-12">
        <a
          href="/"
          className="flex items-center gap-2 text-lg font-medium tracking-tight text-white sm:text-xl"
        >
          <Cloud size={24} strokeWidth={1.5} />
          cloud experts
        </a>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          <a
            href="/#servicios"
            className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
          >
            Servicios
          </a>
          <a
            href="/#tecnologias"
            className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
          >
            Tecnologías
          </a>
          <a
            href="/#certificaciones"
            className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
          >
            Certificaciones
          </a>
          <a
            href="/#clientes"
            className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
          >
            Clientes
          </a>
        </div>

        <a
          href="/#contacto"
          className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
        >
          Contactar
        </a>
      </nav>
    </header>
  )
}
