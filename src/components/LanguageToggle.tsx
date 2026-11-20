import { useLanguage } from '../i18n/useLanguage'
import type { Locale } from '../types/content'

const locales: readonly Locale[] = ['es', 'en']

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div className="language-toggle" role="group" aria-label={t.nav.language}>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          className="language-toggle__button"
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
