import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )

    if (!items.length) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12,
      },
    )

    items.forEach((item) => observer.observe(item))

    /**
     * Al entrar directo con `#proyecto` el observer puede tardar un frame en
     * dispararse; revelamos de inmediato lo que ya está en pantalla para que
     * la sección nunca aparezca vacía.
     */
    const revealVisible = () => {
      const viewport = window.innerHeight
      items.forEach((item) => {
        if (item.classList.contains('is-visible')) return
        const rect = item.getBoundingClientRect()
        if (rect.top < viewport * 0.92 && rect.bottom > 0) {
          item.classList.add('is-visible')
          observer.unobserve(item)
        }
      })
    }

    const frame = window.requestAnimationFrame(revealVisible)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])
}
