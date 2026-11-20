import {
  siDjango,
  siDocker,
  siExpress,
  siGreensock,
  siJavascript,
  siNextdotjs,
  siPostgresql,
  siPrisma,
  siRadixui,
  siReact,
  siTailwindcss,
  siTanstack,
  siThreedotjs,
  siVite,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

const BRAND_ICONS: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  Vite: siVite,
  'Tailwind CSS': siTailwindcss,
  Express: siExpress,
  PostgreSQL: siPostgresql,
  Docker: siDocker,
  React: siReact,
  'Radix UI': siRadixui,
  'TanStack Query': siTanstack,
  Django: siDjango,
  'Next.js': siNextdotjs,
  Prisma: siPrisma,
  'Three.js': siThreedotjs,
  GSAP: siGreensock,
}

function resolveIcon(technology: string) {
  const match = Object.keys(BRAND_ICONS).find(
    (name) => technology === name || technology.startsWith(`${name} `),
  )
  return match ? BRAND_ICONS[match] : undefined
}

function initials(technology: string) {
  const words = technology.split(/\s+/).filter(Boolean)
  if (words.length === 1) return technology.slice(0, 2).toUpperCase()
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

interface TechnologyMarkProps {
  technology: string
}

export function TechnologyMark({ technology }: TechnologyMarkProps) {
  const icon = resolveIcon(technology)

  if (!icon) {
    return (
      <span
        className="technology-mark technology-mark--generic"
        aria-hidden="true"
      >
        {initials(technology)}
      </span>
    )
  }

  return (
    <svg
      className="technology-mark"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}
