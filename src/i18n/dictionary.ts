import type { Locale } from '../types/content'

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  nav: {
    projects: string
    portfolio: string
    language: string
    skip: string
  }
  hero: {
    eyebrow: string
    title: string
    description: string
    start: string
    portfolio: string
    note: string
    orbit: string
  }
  projects: {
    label: string
    formative: string
    stack: string
    next: string
    portfolio: string
  }
  closing: {
    eyebrow: string
    title: string
    description: string
    cta: string
  }
  guide: {
    title: string
    open: string
    close: string
    start: string
    interrupt: string
    continue: string
    audioError: string
    unsupportedVoice: string
  }
  footer: {
    note: string
    portfolio: string
  }
}

const es: Dictionary = {
  meta: {
    title: 'Experiencias — José Mauricio Rangel Núñez',
    description:
      'Recorrido guiado por cinco proyectos: Muiska, MineRoyal, Multitenant, Omegacomplex y AlegrIA.',
  },
  nav: {
    projects: 'Proyectos',
    portfolio: 'Portafolio',
    language: 'Idioma',
    skip: 'Saltar al contenido',
  },
  hero: {
    eyebrow: 'Experiencias de proyecto',
    title: 'Cinco proyectos. Una guía.',
    description:
      'Un recorrido por los proyectos de José Mauricio Rangel Núñez. Elige un capítulo o deja que el scroll avance; KAI te acompaña.',
    start: 'Empezar el recorrido',
    portfolio: 'Volver al portafolio',
    note: 'Proyectos formativos · Sin datos inventados',
    orbit: 'proyectos',
  },
  projects: {
    label: 'Proyecto',
    formative: 'Proyecto formativo',
    stack: 'Stack',
    next: 'Siguiente proyecto',
    portfolio: 'Ver el portafolio completo',
  },
  closing: {
    eyebrow: 'Fin del recorrido',
    title: 'El portafolio completo sigue allí.',
    description:
      'Estas experiencias son una extensión del portafolio. Vuelve para ver el perfil, la experiencia y las habilidades completas.',
    cta: 'Volver al portafolio',
  },
  guide: {
    title: 'Guía del recorrido',
    open: 'Abrir guía',
    close: 'Cerrar guía',
    start: 'Iniciar asistente',
    interrupt: 'Detener recorrido',
    continue: 'Continuar recorrido',
    audioError: 'No se pudo reproducir el audio de esta escena.',
    unsupportedVoice: 'Este navegador no permite reproducir audio.',
  },
  footer: {
    note: 'Una extensión del portafolio de José Mauricio Rangel Núñez.',
    portfolio: 'Volver al portafolio',
  },
}

const en: Dictionary = {
  meta: {
    title: 'Experiences — José Mauricio Rangel Núñez',
    description:
      'A walkthrough of José Mauricio Rangel Núñez’s projects: Muiska, MineRoyal, Multitenant, Omegacomplex and AlegrIA.',
  },
  nav: {
    projects: 'Projects',
    portfolio: 'Portfolio',
    language: 'Language',
    skip: 'Skip to content',
  },
  hero: {
    eyebrow: 'Project experiences',
    title: 'Five projects. One guide.',
    description:
      'A walkthrough of José Mauricio Rangel Núñez’s projects. Pick a chapter or let the scroll move; KAI comes along.',
    start: 'Start the walkthrough',
    portfolio: 'Back to the portfolio',
    note: 'Formative projects · No invented data',
    orbit: 'projects',
  },
  projects: {
    label: 'Project',
    formative: 'Formative project',
    stack: 'Stack',
    next: 'Next project',
    portfolio: 'View the full portfolio',
  },
  closing: {
    eyebrow: 'End of the walkthrough',
    title: 'The full portfolio is still there.',
    description:
      'These experiences are an extension of the portfolio. Go back to see the complete profile, experience and skills.',
    cta: 'Back to the portfolio',
  },
  guide: {
    title: 'Walkthrough guide',
    open: 'Open guide',
    close: 'Close guide',
    start: 'Start guide',
    interrupt: 'Stop walkthrough',
    continue: 'Continue walkthrough',
    audioError: 'This scene audio could not be played.',
    unsupportedVoice: 'This browser cannot play audio.',
  },
  footer: {
    note: 'An extension of José Mauricio Rangel Núñez’s portfolio.',
    portfolio: 'Back to the portfolio',
  },
}

export const dictionaries: Record<Locale, Dictionary> = { es, en }
