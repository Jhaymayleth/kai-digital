import inkStroke from '../assets/visual/ink/sumi-ink-stroke.webp'
import type { Dictionary } from '../i18n/dictionary'
import type { Locale, Project } from '../types/content'

interface ProjectChapterProps {
  project: Project
  index: number
  total: number
  nextProject: Project | null
  locale: Locale
  t: Dictionary
  isActive: boolean
}

export function ProjectChapter({
  project,
  index,
  total,
  nextProject,
  locale,
  t,
  isActive,
}: ProjectChapterProps) {
  const number = String(index + 1).padStart(2, '0')
  const totalLabel = String(total).padStart(2, '0')
  const nextHref = nextProject
    ? `#${nextProject.id}`
    : 'https://jhaymayleth.github.io/#proyectos'

  return (
    <section
      id={project.id}
      className="project-chapter"
      data-active={isActive ? 'true' : undefined}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project-chapter__visual" data-reveal>
        <div className="project-visual" aria-hidden="true">
          <span className="project-visual__grid" />
          <img
            className="project-visual__ink"
            src={inkStroke}
            alt=""
            loading="lazy"
          />
          <span className="project-visual__number">{number}</span>
          <span className="project-visual__name">{project.name}</span>

          <div className="project-visual__sheet">
            <span className="project-visual__sheet-head">
              <span />
              <span />
              <span />
            </span>
            <span className="project-visual__sheet-title">{project.name}</span>
            <span className="project-visual__sheet-line" />
            <span className="project-visual__sheet-line project-visual__sheet-line--short" />
            <span className="project-visual__sheet-chip">
              {t.projects.formative}
            </span>
          </div>

          <span className="project-visual__seal">JMR</span>
        </div>
      </div>

      <div className="project-chapter__copy" data-reveal>
        <p className="eyebrow">
          {t.projects.label} {number} <span aria-hidden="true">/</span>{' '}
          {totalLabel}
        </p>
        <h2 id={`${project.id}-title`} className="project-chapter__title">
          {project.name}
        </h2>
        <p className="project-chapter__tagline">{project.tagline[locale]}</p>

        <div className="project-chapter__stack">
          <p className="eyebrow">{t.projects.stack}</p>
          <ul className="stack-list">
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>

        <p className="project-chapter__meta">
          <span aria-hidden="true" />
          {t.projects.formative}
        </p>

        <a
          className="chapter-link"
          href={nextHref}
          target={nextProject ? undefined : '_blank'}
          rel={nextProject ? undefined : 'noreferrer'}
        >
          <span className="eyebrow">
            {nextProject ? t.projects.next : t.projects.portfolio}
          </span>
          <span>
            {nextProject ? nextProject.name : t.nav.portfolio}{' '}
            <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </section>
  )
}
