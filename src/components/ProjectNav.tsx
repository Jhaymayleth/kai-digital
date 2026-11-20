import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { projects } from '../data/projects'
import { useLanguage } from '../i18n/useLanguage'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

const PORTFOLIO_URL = 'https://jhaymayleth.github.io/#proyectos'

interface ProjectNavProps {
  activeId: string | null
}

export function ProjectNav({ activeId }: ProjectNavProps) {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )
      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const firstControl =
      panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      )
    firstControl?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          className="site-brand"
          href="#inicio"
          aria-label="José Mauricio Rangel Núñez — Inicio"
        >
          <span className="site-brand__mark" aria-hidden="true">
            M
          </span>
          <span className="site-brand__text" aria-hidden="true">
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
          <LanguageToggle />
          <ThemeToggle />
          <a
            className="portfolio-link"
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t.nav.portfolio} <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen &&
        createPortal(
          <div
            className="nav-overlay"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeMenu()
            }}
          >
            <div
              ref={panelRef}
              id="mobile-nav-panel"
              className="nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label={t.nav.projects}
            >
              <p className="eyebrow nav-panel__title">{t.nav.projects}</p>
              <ol className="nav-panel__list">
                {projects.map((project, index) => (
                  <li key={project.id}>
                    <a
                      href={`#${project.id}`}
                      className="nav-panel__link"
                      onClick={closeMenu}
                      aria-current={
                        activeId === project.id ? 'location' : undefined
                      }
                    >
                      <span className="nav-panel__index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{project.name}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>

              <div className="nav-panel__actions">
                <LanguageToggle />
                <a
                  className="nav-panel__portfolio"
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                >
                  {t.nav.portfolio}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  )
}
