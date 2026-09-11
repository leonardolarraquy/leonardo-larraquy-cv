/// <reference types="vite/client" />

declare global {
  interface Window {
    gtagSendEvent?: (url: string | undefined) => boolean
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export {}
