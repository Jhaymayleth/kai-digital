export type Locale = 'es' | 'en'

export interface LocalizedText {
  es: string
  en: string
}

export interface Project {
  id: string
  name: string
  tagline: LocalizedText
  stack: readonly string[]
}
