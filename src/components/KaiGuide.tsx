import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import { useSpeech, type AudioScene } from '../hooks/useSpeech'
import { useLanguage } from '../i18n/useLanguage'
import type { Project } from '../types/content'
import { KaiCharacter, type KaiPhase } from './KaiCharacter'

const sectionOrder = [
  'inicio',
  ...projects.map((project) => project.id),
  'closing',
]
const PRE_END_SCROLL_SECONDS = 2
const SCROLL_DURATION_MS = 1800

function audioSceneForSection(sectionId: string): AudioScene {
  if (sectionId === 'closing') return 'closing'
  return projects.find((project) => project.id === sectionId)?.id ?? 'welcome'
}

interface KaiGuideProps {
  activeProject: Project | null
  activeSection: 'inicio' | 'project' | 'closing'
  onStart: () => string
}

export function KaiGuide({
  activeProject,
  activeSection,
  onStart,
}: KaiGuideProps) {
  const { locale, t } = useLanguage()
  const {
    supported: audioSupported,
    audioProgress,
    speak: speakAudio,
    stop: stopAudio,
  } = useSpeech()
  const [started, setStarted] = useState(false)
  const [autoRunning, setAutoRunning] = useState(false)
  const [open, setOpen] = useState(true)
  const autoRunningRef = useRef(false)
  const audioEndedRef = useRef(false)
  const scrollStartedRef = useRef(false)
  const scrollFinishedRef = useRef(true)
  const currentSceneSectionRef = useRef<string | null>(null)
  const scrollFrameRef = useRef<number | null>(null)
  const playSectionRef = useRef<(sectionId: string) => void>(() => {})
  const description = activeProject
    ? `${activeProject.name}. ${activeProject.tagline[locale]} ${t.projects.stack}: ${activeProject.stack.join(', ')}.`
    : ''

  const stopCinematicScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current)
      scrollFrameRef.current = null
    }
  }, [])

  const stopAutoRun = useCallback(() => {
    autoRunningRef.current = false
    currentSceneSectionRef.current = null
    stopCinematicScroll()
    setAutoRunning(false)
  }, [stopCinematicScroll])

  useEffect(
    () => () => {
      autoRunningRef.current = false
      stopCinematicScroll()
    },
    [stopCinematicScroll],
  )

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const section = document.getElementById(sectionId)
      if (!section) {
        stopAutoRun()
        return
      }

      stopCinematicScroll()
      scrollStartedRef.current = true
      scrollFinishedRef.current = false

      const header = document.querySelector<HTMLElement>('.site-header')
      const headerHeight = header?.getBoundingClientRect().height ?? 0
      const startY = window.scrollY
      const targetY = Math.max(
        0,
        section.getBoundingClientRect().top + startY - headerHeight,
      )

      const finish = () => {
        scrollFrameRef.current = null
        scrollFinishedRef.current = true
        if (audioEndedRef.current && autoRunningRef.current) {
          playSectionRef.current(sectionId)
        }
      }

      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        Math.abs(targetY - startY) < 2
      ) {
        window.scrollTo({ top: targetY, behavior: 'auto' })
        finish()
        return
      }

      const startedAt = performance.now()
      const easeInOutCubic = (progress: number) =>
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const step = (now: number) => {
        if (!autoRunningRef.current) {
          scrollFrameRef.current = null
          return
        }
        const progress = Math.min((now - startedAt) / SCROLL_DURATION_MS, 1)
        window.scrollTo({
          top: startY + (targetY - startY) * easeInOutCubic(progress),
          behavior: 'instant',
        })

        if (progress === 1) {
          finish()
          return
        }
        scrollFrameRef.current = window.requestAnimationFrame(step)
      }

      scrollFrameRef.current = window.requestAnimationFrame(step)
    },
    [stopAutoRun, stopCinematicScroll],
  )

  const playSection = useCallback(
    (sectionId: string) => {
      if (!autoRunningRef.current) return

      audioEndedRef.current = false
      scrollStartedRef.current = false
      scrollFinishedRef.current = true
      currentSceneSectionRef.current = sectionId

      const nextSection = sectionOrder[sectionOrder.indexOf(sectionId) + 1]
      speakAudio(
        audioSceneForSection(sectionId),
        () => {
          if (!autoRunningRef.current) return
          currentSceneSectionRef.current = null
          audioEndedRef.current = true

          if (!nextSection) {
            stopAutoRun()
            return
          }
          if (!scrollStartedRef.current) scrollToSection(nextSection)
          else if (scrollFinishedRef.current) playSectionRef.current(nextSection)
        },
        stopAutoRun,
      )
    },
    [scrollToSection, speakAudio, stopAutoRun],
  )
  useLayoutEffect(() => {
    playSectionRef.current = playSection
  }, [playSection])

  const beginAutoRun = useCallback(
    (sectionId: string, withReengagementCues: boolean) => {
      autoRunningRef.current = true
      audioEndedRef.current = false
      scrollStartedRef.current = false
      scrollFinishedRef.current = true
      setAutoRunning(true)

      if (!withReengagementCues) {
        playSection(sectionId)
        return
      }

      speakAudio(
        'resume',
        () =>
          speakAudio(
            'surprise',
            () => playSection(sectionId),
            stopAutoRun,
          ),
        stopAutoRun,
      )
    },
    [playSection, speakAudio, stopAutoRun],
  )

  const interruptAutoRun = useCallback(() => {
    if (!autoRunningRef.current) return

    stopAutoRun()
    stopAudio()
    speakAudio('paused')
  }, [speakAudio, stopAudio, stopAutoRun])

  useEffect(() => {
    if (!autoRunning || !audioProgress.isPlaying) return
    const sectionId = currentSceneSectionRef.current
    if (
      !sectionId ||
      audioProgress.duration <= 0 ||
      scrollStartedRef.current ||
      audioProgress.duration - audioProgress.currentTime >
        PRE_END_SCROLL_SECONDS
    ) {
      return
    }

    const nextSection = sectionOrder[sectionOrder.indexOf(sectionId) + 1]
    if (nextSection) scrollToSection(nextSection)
  }, [
    audioProgress.currentTime,
    audioProgress.duration,
    audioProgress.isPlaying,
    autoRunning,
    scrollToSection,
  ])

  useEffect(() => {
    const isGuideControl = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(
        target.closest('.guide__kai-button, .guide__start, .guide__close'),
      )

    const interruptOnPointerDown = (event: PointerEvent) => {
      if (isGuideControl(event.target)) return
      interruptAutoRun()
    }
    const interruptOnTouchStart = (event: TouchEvent) => {
      if (isGuideControl(event.target)) return
      interruptAutoRun()
    }
    const interruptOnKeyDown = (event: KeyboardEvent) => {
      if (isGuideControl(event.target)) return
      if (
        ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(
          event.key,
        )
      ) {
        interruptAutoRun()
      }
    }

    document.addEventListener('pointerdown', interruptOnPointerDown, true)
    document.addEventListener('keydown', interruptOnKeyDown, true)
    window.addEventListener('wheel', interruptAutoRun, { passive: true })
    window.addEventListener('touchstart', interruptOnTouchStart, {
      passive: true,
    })

    return () => {
      document.removeEventListener('pointerdown', interruptOnPointerDown, true)
      document.removeEventListener('keydown', interruptOnKeyDown, true)
      window.removeEventListener('wheel', interruptAutoRun)
      window.removeEventListener('touchstart', interruptOnTouchStart)
    }
  }, [interruptAutoRun])

  function startAssistant() {
    if (!audioSupported || locale === 'en') return

    const sectionId = onStart()
    setStarted(true)
    beginAutoRun(sectionId, false)
  }

  function toggleAssistant() {
    if (locale === 'en') return
    if (!started) {
      startAssistant()
      return
    }

    if (autoRunningRef.current) {
      interruptAutoRun()
      return
    }

    beginAutoRun(onStart(), true)
  }

  function closeGuide() {
    stopAutoRun()
    setStarted(false)
    setOpen(false)
    stopAudio()
  }

  if (!open) {
    return (
      <button
        type="button"
        className="guide-restore"
        onClick={() => setOpen(true)}
        aria-label={t.guide.open}
      >
        <span aria-hidden="true">?</span>
        <span>{t.guide.open}</span>
      </button>
    )
  }

  const phase: KaiPhase = !started
    ? 'idle'
    : !autoRunning
      ? 'paused'
      : activeSection === 'project'
        ? 'project'
        : 'greeting'

  return (
    <aside className="guide" aria-label={t.guide.title}>
      <div className="guide__bubble">
        <div className="guide__bubble-head">
          <p className="eyebrow guide__badge">
            <span className="guide__spirit" aria-hidden="true" />
            KAI <span className="guide__badge-label">{t.guide.title}</span>
          </p>
          <button
            type="button"
            className="guide__close"
            onClick={closeGuide}
            aria-label={t.guide.close}
          >
            ×
          </button>
        </div>

        {locale === 'en' ? (
          <p className="guide__message" role="status">
            {t.guide.unavailableInEnglish}
          </p>
        ) : (
          <>
            {description && (
              <p className="guide__message" role="status" aria-live="polite">
                {description}
              </p>
            )}
            {audioProgress.error && (
              <p className="guide__error" role="alert">
                {t.guide.audioError}
              </p>
            )}
          </>
        )}

        {!started && locale === 'es' && (
          <div className="guide__controls">
            <button
              type="button"
              className="guide__control guide__start"
              onClick={startAssistant}
              disabled={!audioSupported}
              title={!audioSupported ? t.guide.unsupportedVoice : undefined}
            >
              {t.guide.start}
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        className="guide__kai-button"
        onClick={toggleAssistant}
        aria-label={
          locale === 'en'
            ? t.guide.unavailableInEnglish
            : !started
              ? t.guide.start
              : autoRunning
                ? t.guide.interrupt
                : t.guide.continue
        }
        aria-pressed={autoRunning}
        disabled={locale === 'en'}
      >
        <KaiCharacter phase={phase} talking={audioProgress.isPlaying} />
      </button>
    </aside>
  )
}
