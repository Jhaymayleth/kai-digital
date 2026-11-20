# Experiencias — José Mauricio Rangel Núñez

Web app independiente para la **mascota guía (KAI)** y la **presentación de los 5 proyectos** del portafolio. Vive fuera de `jhaymayleth.github.io` para que GitHub Pages no cargue animaciones, videos ni assets pesados.

- **Ruta local:** `~/Escritorio/experiencias`
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS 4
- **Idiomas:** ES / EN con persistencia en `localStorage`
- **Navegación:** anclajes `#muiska`, `#mineroyal`, `#multitenant`, `#omegacomplex`, `#alegria`
- **Sin backend ni cookies**

> **Mascota Guía KAI:** KAI es el acompañante y guía espiritual anime chibi de la presentación. Su diseño visual maestro se especifica en [`design/mascota/KAI_VISUAL_DESIGN.md`](design/mascota/KAI_VISUAL_DESIGN.md) y [`design/mascota/KAI_CHARACTER_BIBLE.md`](design/mascota/KAI_CHARACTER_BIBLE.md).

## Arranque

```bash
cd ~/Escritorio/experiencias
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

El build queda en `dist/`. La base de Vite es relativa, así que puede publicarse en un dominio propio o en un subdirectorio.

## Qué incluye

- Hero de entrada con el recorrido y enlace de vuelta al portafolio.
- Cinco capítulos de proyecto con nombre, descripción corta, stack y contexto formativo.
- Navegación fija con proyecto activo, idioma y enlace al portafolio.
- Mascota guía (KAI) con estados `idle`, `surprise`, `greeting`, `project` y `paused`.
- Burbuja con narración por proyecto y frase puente al reanudar.
- Voz sintética **opt-in** con `speechSynthesis`; nunca arranca sola.
- Pausa al pulsar a KAI o el control; cierre y restauración de la guía.
- Scroll suave, revelado por viewport y respeto a `prefers-reduced-motion`.
- Layout responsive para desktop y móvil.

## Datos de proyectos

Los datos viven en `src/data/projects.ts` y son los mismos cinco proyectos del portafolio, con sus descripciones y stacks ya acordados. **No inventar** año, rol, métricas ni funcionalidades.

Los capítulos muestran solo la información disponible: nombre, tagline, stack y condición de proyecto formativo. Cuando el titular entregue el caso de estudio completo, se puede ampliar `ProjectChapter` sin cambiar la navegación ni los anclajes.

## Mascota Guía (KAI)

KAI es un chico espiritual en estilo 2D Anime Chibi (2.5 cabezas), ataviado con Japanese Fantasy Streetwear (haori abierto, cinta carmesí lumbar, zapatillas chunky) y cabello desestructurado con mechón blanco dominante ($S1$).

Sus assets web transparentes viven en `src/assets/kai/` y sus especificaciones y exportaciones en `design/mascota/`.

## Conectar con el portafolio

En `jhaymayleth.github.io/src/data/projects.ts`:

```ts
export const projectsAppUrl = 'https://TU-DOMINIO-O-RUTA/'
```

La app debe conservar los anclajes. El portafolio abre `projectsAppUrl#slug` en una pestaña nueva.

## Publicación

Opciones válidas: Vercel, Netlify, Cloudflare Pages o GitHub Pages en un repositorio propio. Para GitHub Pages, publicar el contenido de `dist/` y mantener los anclajes por hash; no requiere reglas de rewrite.

Antes de publicar, verificar:

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Las 5 tarjetas del portafolio abren el capítulo correcto.
- [ ] La URL real quedó guardada en `projectsAppUrl`.
- [ ] La mascota guía final está aprobada por el titular.
- [ ] El guion y las respuestas de KAI están aprobados.
- [ ] No hay capturas, videos ni código sensible en este repo.
