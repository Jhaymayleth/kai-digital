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
    pause: string
    resume: string
    voiceOn: string
    voiceOff: string
    speaking: string
    unsupportedVoice: string
    surprise: string
    welcome: string
    paused: string
    resumeNote: string
    project: string
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
      'Recorrido por los proyectos de José Mauricio Rangel Núñez: Muiska, MineRoyal, Multitenant, Omegacomplex y AlegrIA.',
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
      'Un recorrido por los proyectos de José Mauricio Rangel Núñez. Elige un capítulo o deja que el scroll avance; el avatar te acompaña.',
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
    pause: 'Pausar guía',
    resume: 'Reanudar guía',
    voiceOn: 'Activar voz',
    voiceOff: 'Silenciar',
    speaking: 'Hablando',
    unsupportedVoice: 'Este navegador no ofrece voz sintética.',
    surprise: 'Ah, llegaste. Qué bueno verte por aquí.',
    welcome:
      'Hola, soy la guía de este recorrido. Puedes saltar entre proyectos o dejar que el scroll avance. Yo te cuento lo esencial de cada uno.',
    paused: 'Guía en pausa. Pulsa el avatar para continuar.',
    resumeNote: 'Como te venía contando, sigamos con el recorrido.',
    project:
      'Estás en {name}. {tagline} Su stack principal es {stack}.',
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
      'A walkthrough of José Mauricio Rangel Núñez’s projects. Pick a chapter or let the scroll move; the avatar comes along.',
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
    pause: 'Pause guide',
    resume: 'Resume guide',
    voiceOn: 'Enable voice',
    voiceOff: 'Mute',
    speaking: 'Speaking',
    unsupportedVoice: 'This browser does not provide synthetic voice.',
    surprise: 'Oh, you made it. Good to see you here.',
    welcome:
      'Hi, I’m the guide for this walkthrough. Jump between projects or let the scroll move. I’ll tell you the essentials of each one.',
    paused: 'Guide paused. Press the avatar to continue.',
    resumeNote: 'As I was saying, let’s keep going.',
    project:
      'You are in {name}. {tagline} Its main stack is {stack}.',
  },
  footer: {
    note: 'An extension of José Mauricio Rangel Núñez’s portfolio.',
    portfolio: 'Back to the portfolio',
  },
}

export const dictionaries: Record<Locale, Dictionary> = { es, en }
