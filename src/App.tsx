import { KaiGuide } from './components/KaiGuide'
import { ProjectChapter } from './components/ProjectChapter'
import { ProjectNav } from './components/ProjectNav'
import { projects } from './data/projects'
import { LanguageProvider } from './i18n/LanguageProvider'
import { useLanguage } from './i18n/useLanguage'
import { useActiveProject } from './hooks/useActiveProject'
import { useReveal } from './hooks/useReveal'

const portfolioUrl = 'https://jhaymayleth.github.io/#proyectos'

function Experience() {
  const { locale, t } = useLanguage()
  useReveal()
  const {
    activeId,
    isHome,
    isClosing,
    refreshActiveSection,
  } = useActiveProject()
  const activeProject =
    projects.find((project) => project.id === activeId) ?? null
  const activeSection = isClosing
    ? 'closing'
    : isHome
      ? 'inicio'
      : 'project'

  return (
    <div className="experience-shell">
      <a className="skip-link" href="#contenido">
        {t.nav.skip}
      </a>

      <ProjectNav activeId={activeId} />

      <main id="contenido" tabIndex={-1}>
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="hero__copy" data-reveal>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title" className="hero__title">
              {t.hero.title}
            </h1>
            <p className="hero__description">{t.hero.description}</p>

            <div className="hero__actions">
              <a className="button button--primary" href="#muiska">
                {t.hero.start} <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button--ghost"
                href={portfolioUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t.hero.portfolio} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p className="hero__note">{t.hero.note}</p>
          </div>

          <div className="hero__stage" aria-hidden="true" data-reveal>
            <div className="hero-orbit">
              <span className="hero-orbit__ring" />
              <span className="hero-orbit__ring hero-orbit__ring--inner" />
              <span className="hero-orbit__number">05</span>
              <span className="hero-orbit__caption">{t.hero.orbit}</span>

              {projects.map((project, index) => (
                <span
                  key={project.id}
                  className={`hero-orbit__dot hero-orbit__dot--${index + 1}`}
                />
              ))}

              <span className="hero-orbit__line" />
              <span className="hero-orbit__line hero-orbit__line--two" />
            </div>
          </div>
        </section>

        <div className="chapters">
          {projects.map((project, index) => (
            <ProjectChapter
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              nextProject={projects[index + 1] ?? null}
              locale={locale}
              t={t}
              isActive={activeId === project.id}
            />
          ))}
        </div>

        <section
          id="closing"
          className="closing"
          aria-labelledby="closing-title"
          data-reveal
        >
          <p className="eyebrow">{t.closing.eyebrow}</p>
          <h2 id="closing-title" className="closing__title">
            {t.closing.title}
          </h2>
          <p className="closing__description">{t.closing.description}</p>
          <a
            className="button button--primary"
            href={portfolioUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t.closing.cta} <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>{t.footer.note}</p>
        <a href={portfolioUrl} target="_blank" rel="noreferrer">
          {t.footer.portfolio} <span aria-hidden="true">↗</span>
        </a>
      </footer>

      <KaiGuide
        activeProject={activeProject}
        activeSection={activeSection}
        onStart={refreshActiveSection}
      />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Experience />
    </LanguageProvider>
  )
}
