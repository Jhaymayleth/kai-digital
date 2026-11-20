import { useCallback, useEffect, useRef, useState } from 'react'
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
  const { t } = useLanguage()
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
  const pendingSectionRef = useRef<string | null>(null)
  const activeSectionId =
    activeSection === 'closing'
      ? 'closing'
      : activeProject?.id ?? 'inicio'
  const description = activeProject
    ? `${activeProject.name}. ${activeProject.tagline.es} ${t.projects.stack}: ${activeProject.stack.join(', ')}.`
    : ''

  const playSection = useCallback(
    (sectionId: string) => {
      const scene = audioSceneForSection(sectionId)
      speakAudio(
        scene,
        () => {
          if (!autoRunningRef.current) return

          const nextSection = sectionOrder[sectionOrder.indexOf(sectionId) + 1]
          if (!nextSection) {
            autoRunningRef.current = false
            setAutoRunning(false)
            return
          }

          pendingSectionRef.current = nextSection
          document.getElementById(nextSection)?.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'auto'
              : 'smooth',
            block: 'start',
          })
        },
        () => {
          pendingSectionRef.current = null
          autoRunningRef.current = false
          setAutoRunning(false)
        },
      )
    },
    [speakAudio],
  )

  const beginAutoRun = useCallback(
    (sectionId: string) => {
      autoRunningRef.current = true
      pendingSectionRef.current = null
      setAutoRunning(true)
      playSection(sectionId)
    },
    [playSection],
  )

  const interruptAutoRun = useCallback(() => {
    if (!autoRunningRef.current) return

    autoRunningRef.current = false
    if (pendingSectionRef.current) {
      window.scrollTo({
        left: window.scrollX,
        top: window.scrollY,
        behavior: 'instant',
      })
    }
    pendingSectionRef.current = null
    setAutoRunning(false)
    stopAudio()
  }, [stopAudio])

  useEffect(() => {
    if (
      autoRunning &&
      pendingSectionRef.current === activeSectionId
    ) {
      const sectionId = pendingSectionRef.current
      pendingSectionRef.current = null
      playSection(sectionId)
    }
  }, [activeSectionId, autoRunning, playSection])

  useEffect(() => {
    const interruptOnPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (
        target instanceof Element &&
        target.closest('.guide__kai-button, .guide__start')
      ) {
        return
      }
      interruptAutoRun()
    }

    const interruptOnScrollIntent = () => interruptAutoRun()
    const interruptOnKeyDown = (event: KeyboardEvent) => {
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
    window.addEventListener('wheel', interruptOnScrollIntent, { passive: true })
    window.addEventListener('touchstart', interruptOnScrollIntent, {
      passive: true,
    })

    return () => {
      document.removeEventListener('pointerdown', interruptOnPointerDown, true)
      document.removeEventListener('keydown', interruptOnKeyDown, true)
      window.removeEventListener('wheel', interruptOnScrollIntent)
      window.removeEventListener('touchstart', interruptOnScrollIntent)
    }
  }, [interruptAutoRun])

  function startAssistant() {
    if (!audioSupported) return

    const sectionId = onStart()
    setStarted(true)
    beginAutoRun(sectionId)
  }

  function toggleAssistant() {
    if (!started) {
      startAssistant()
      return
    }

    if (autoRunningRef.current) {
      interruptAutoRun()
      return
    }

    beginAutoRun(onStart())
  }

  function closeGuide() {
    if (pendingSectionRef.current) {
      window.scrollTo({
        left: window.scrollX,
        top: window.scrollY,
        behavior: 'instant',
      })
    }
    autoRunningRef.current = false
    pendingSectionRef.current = null
    setStarted(false)
    setAutoRunning(false)
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

        {!started && (
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
          !started
            ? t.guide.start
            : autoRunning
              ? t.guide.interrupt
              : t.guide.continue
        }
        aria-pressed={autoRunning}
      >
        <KaiCharacter phase={phase} talking={audioProgress.isPlaying} />
      </button>
    </aside>
  )
}
