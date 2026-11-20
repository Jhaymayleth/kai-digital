export type Locale = 'es' | 'en'
export type ProjectId =
  | 'muiska'
  | 'mineroyal'
  | 'multitenant'
  | 'omegacomplex'
  | 'alegria'

export interface LocalizedText {
  es: string
  en: string
}

export interface Project {
  id: ProjectId
  name: string
  tagline: LocalizedText
  stack: readonly string[]
}
