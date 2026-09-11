export function trackContactConversion() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion_event_contact_2', {})
  }
}
