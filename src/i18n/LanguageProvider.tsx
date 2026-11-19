import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries } from './dictionary'
import { LanguageContext } from './language-context'
import type { Locale } from '../types/content'

const STORAGE_KEY = 'experiencias:language'

function getInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') return stored
    return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
  } catch {
    return 'es'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
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
      // Sin almacenamiento disponible: el idioma sigue funcionando en memoria.
    }
  }, [locale, t])

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
