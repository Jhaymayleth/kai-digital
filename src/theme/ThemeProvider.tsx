import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ThemeContext } from './theme-context'
import type { Theme } from './theme-context'

const STORAGE_KEY = 'portfolio:theme'
const THEME_COLORS: Record<Theme, string> = {
  light: '#f7f5f0',
  dark: '#0e100f',
}

function getInitialTheme(): Theme {
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  } catch {
    return 'dark'
  }
}

function hasStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark'
  } catch {
    return false
  }
}

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[next])
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
    applyTheme(theme)
  }, [theme])

  /**
   * El DOM se actualiza de forma síncrona para que la View Transition capture
   * el tema nuevo en el mismo frame del clic (revelado circular).
   */
  const toggleTheme = useCallback(() => {
    const next: Theme = themeRef.current === 'dark' ? 'light' : 'dark'
    themeRef.current = next
    applyTheme(next)
    setTheme(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // El tema permanece disponible aunque no se pueda guardar.
    }
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const syncWithSystem = (event: MediaQueryListEvent) => {
      if (!hasStoredTheme()) setTheme(event.matches ? 'dark' : 'light')
    }

    query.addEventListener('change', syncWithSystem)
    return () => query.removeEventListener('change', syncWithSystem)
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
