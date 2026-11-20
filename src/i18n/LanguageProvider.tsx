import { useEffect, useMemo, type ReactNode } from 'react'
import { dictionaries } from './dictionary'
import { LanguageContext } from './language-context'
import type { Locale } from '../types/content'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale: Locale = 'es'
  const t = dictionaries[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.description)
  }, [locale, t])

  const value = useMemo(
    () => ({ locale, t }),
    [t],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
