import { projects } from '../data/projects'
import { useLanguage } from '../i18n/useLanguage'
import { LanguageToggle } from './LanguageToggle'

interface ProjectNavProps {
  activeId: string | null
}

export function ProjectNav({ activeId }: ProjectNavProps) {
  const { t } = useLanguage()

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-brand" href="#inicio">
          <span className="site-brand__mark" aria-hidden="true">
            M
          </span>
          <span className="site-brand__text">
            <span>José Mauricio</span>
            <span>Rangel Núñez</span>
          </span>
        </a>

        <nav className="project-nav" aria-label={t.nav.projects}>
          <ol>
            {projects.map((project, index) => (
              <li key={project.id}>
                <a
                  href={`#${project.id}`}
                  className="project-nav__link"
                  aria-current={activeId === project.id ? 'location' : undefined}
                >
                  <span className="project-nav__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{project.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="site-header__actions">
          <a
            className="portfolio-link"
            href="https://jhaymayleth.github.io/#proyectos"
            target="_blank"
            rel="noreferrer"
          >
            {t.nav.portfolio} <span aria-hidden="true">↗</span>
          </a>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
