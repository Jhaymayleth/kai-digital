import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries } from './dictionary'
import { LanguageContext } from './language-context'
import type { Locale } from '../types/content'

const STORAGE_KEY = 'portfolio:locale'

function getInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') return stored
    return window.navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es'
  } catch {
    return 'es'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)
  const t = dictionaries[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.description)
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // El idioma sigue funcionando en memoria sin almacenamiento persistente.
    }
  }, [locale, t])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
