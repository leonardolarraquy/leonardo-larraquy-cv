import { trackContactConversion } from '@/components/AnalyticsScripts'
import { GlassPanel } from './GlassPanel'
import { RevealOnScroll } from './RevealOnScroll'
import { FORM_ACTION } from '@/data/constants'

export function ContactForm() {
  const handleSubmit = () => {
    trackContactConversion()
  }

  return (
    <RevealOnScroll>
      <GlassPanel
        variant="bordered"
        className="rounded-2xl p-6 sm:p-8"
      >
        <form
          className="space-y-4"
          action={FORM_ACTION}
          method="POST"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-4 text-xl font-medium text-white">
            Solicita tu Consultoría Gratuita
          </h3>
          <div>
            <label htmlFor="user_name" className="mb-2 block text-sm font-medium text-white/80">
              Nombre Completo
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              required
              placeholder="Tu nombre completo"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="user_email" className="mb-2 block text-sm font-medium text-white/80">
              Email Corporativo
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              required
              placeholder="tu@empresa.com"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-white/80">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Nombre de tu empresa"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/80">
              Describe tu Proyecto
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Cuéntame sobre tu proyecto, objetivos y desafíos técnicos..."
              className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/85"
          >
            Enviar Consultoría Gratuita
          </button>
          <p className="text-center text-sm text-white/60">
            ✓ Respuesta en menos de 24 horas
            <br />✓ Consultoría inicial sin compromiso
          </p>
        </form>
      </GlassPanel>
    </RevealOnScroll>
  )
}
