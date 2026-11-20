import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { useTheme } from '../theme/useTheme'

type ViewTransitionHandle = { ready: Promise<void> }

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    callback: () => void | Promise<void>,
  ) => ViewTransitionHandle
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isDark = theme === 'dark'
  const label = isDark ? t.nav.themeToLight : t.nav.themeToDark

  const handleClick = () => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const doc = document as ViewTransitionDocument

    if (!doc.startViewTransition || reducedMotion) {
      toggleTheme()
      return
    }

    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 48
    const y = rect ? rect.top + rect.height / 2 : 48
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = doc.startViewTransition(() => {
      flushSync(() => toggleTheme())
    })

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 560,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {
        // Si el navegador cancela la transición, el tema ya cambió igualmente.
      })
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <Sun
          className="theme-toggle-icon"
          size={16}
          strokeWidth={1.6}
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="theme-toggle-icon"
          size={16}
          strokeWidth={1.6}
          aria-hidden="true"
        />
      )}
    </button>
  )
}
