import { createContext } from 'react'
import type { Dictionary } from './dictionary'
import type { Locale } from '../types/content'

export interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
