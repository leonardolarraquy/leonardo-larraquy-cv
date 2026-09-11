import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'light' | 'bordered'
}

export function GlassPanel({
  children,
  className = '',
  variant = 'default',
}: GlassPanelProps) {
  const base =
    variant === 'light'
      ? 'bg-white/10 backdrop-blur-md'
      : variant === 'bordered'
        ? 'border border-white/15 bg-white/10 backdrop-blur-md'
        : 'bg-white/15 backdrop-blur-md'

  return <div className={`${base} ${className}`}>{children}</div>
}

export function LeftAccentBadge({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] ${className}`}
    >
      {children}
    </div>
  )
}
