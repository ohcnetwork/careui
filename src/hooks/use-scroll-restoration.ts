import { useEffect } from 'react'

/**
 * Custom hook to restore scroll position to top when dependencies change
 * Useful for resetting scroll when navigating between pages/components
 * Only scrolls the main content area, not the entire page or sidebar
 */
export function useScrollRestoration(deps: any[]) {
  useEffect(() => {
    // Scroll immediately
    scrollToTop()

    // Also scroll after a short delay to handle async content loading
    const timer = setTimeout(() => {
      scrollToTop()
    }, 50)

    return () => clearTimeout(timer)
  }, deps)
}

function scrollToTop() {
  // Target the main content scroll container by ID
  const mainContentScroll = document.getElementById('main-content-scroll')

  if (mainContentScroll && 'scrollTop' in mainContentScroll) {
    mainContentScroll.scrollTop = 0
  }

  // Also scroll any inner main elements (ComponentDocDisplay and DocumentationDisplay)
  const innerMainElements = document.querySelectorAll('main.overflow-y-auto')
  innerMainElements.forEach(element => {
    if (element && 'scrollTop' in element) {
      (element as Element & { scrollTop: number }).scrollTop = 0
    }
  })
}
