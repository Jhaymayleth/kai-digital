import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Pause, Play, X } from 'lucide-react'
import { projects } from '../data/projects'
import { useSpeech, type AudioScene } from '../hooks/useSpeech'
import { useLanguage } from '../i18n/useLanguage'
import { getSectionScrollTarget } from '../lib/scroll'
import type { Project } from '../types/content'
import { KaiCharacter, type KaiPhase } from './KaiCharacter'

const sectionOrder = [
  'inicio',
  ...projects.map((project) => project.id),
  'closing',
]

/**
 * Ventana de transición: el scroll arranca cuando al audio le queda este
 * tiempo y termina exactamente en `ended`. Se ajusta según la distancia.
 */
const MIN_TRANSITION_SECONDS = 1.6
const MAX_TRANSITION_SECONDS = 2.8

function audioSceneForSection(sectionId: string): AudioScene {
  if (sectionId === 'closing') return 'closing'
  return projects.find((project) => project.id === sectionId)?.id ?? 'welcome'
}

function transitionSecondsFor(distance: number) {
  const seconds = MIN_TRANSITION_SECONDS + Math.abs(distance) / 2600
  return Math.min(MAX_TRANSITION_SECONDS, Math.max(MIN_TRANSITION_SECONDS, seconds))
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const easeInOutCubic = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2

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
    preload,
    getAudio,
  } = useSpeech()

  const [started, setStarted] = useState(false)
  const [autoRunning, setAutoRunning] = useState(false)
  const [open, setOpen] = useState(false)

  const autoRunningRef = useRef(false)
  const currentSectionRef = useRef<string | null>(null)
  const nextSectionRef = useRef<string | null>(null)
  const transitionStartedRef = useRef(false)
  const monitorFrameRef = useRef<number | null>(null)
  const scrollFrameRef = useRef<number | null>(null)
  const playSceneRef = useRef<(sectionId: string) => void>(() => {})
  const finishSceneRef = useRef<() => void>(() => {})

  const description = activeProject
    ? `${activeProject.name}. ${activeProject.tagline[locale]} ${t.projects.stack}: ${activeProject.stack.join(', ')}.`
    : ''

  const cancelFrames = useCallback(() => {
    if (monitorFrameRef.current !== null) {
      window.cancelAnimationFrame(monitorFrameRef.current)
      monitorFrameRef.current = null
    }
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current)
      scrollFrameRef.current = null
    }
    document.documentElement.classList.remove('is-cinematic')
  }, [])

  const stopRun = useCallback(() => {
    autoRunningRef.current = false
    currentSectionRef.current = null
    nextSectionRef.current = null
    transitionStartedRef.current = false
    cancelFrames()
    setAutoRunning(false)
  }, [cancelFrames])

  /**
   * Desplazamiento cinematográfico anclado al reloj del audio: en cada frame
   * se calcula el progreso con `audio.currentTime`, así el movimiento llega
   * al destino justo cuando la pista termina.
   */
  const startTransition = useCallback(() => {
    const nextId = nextSectionRef.current
    if (!nextId) return
    const section = document.getElementById(nextId)
    const audio = getAudio()
    if (!section || !audio) return

    transitionStartedRef.current = true
    const startY = window.scrollY
    const targetY = getSectionScrollTarget(section)
    const audioStart = audio.currentTime
    const audioEnd =
      Number.isFinite(audio.duration) && audio.duration > audioStart
        ? audio.duration
        : audioStart + MIN_TRANSITION_SECONDS

    document.documentElement.classList.add('is-cinematic')

    const step = () => {
      if (!autoRunningRef.current) {
        scrollFrameRef.current = null
        return
      }
      const player = getAudio()
      if (!player) {
        scrollFrameRef.current = null
        return
      }
      const span = Math.max(audioEnd - audioStart, 0.001)
      const progress = clamp01((player.currentTime - audioStart) / span)
      window.scrollTo(
        0,
        startY + (targetY - startY) * easeInOutCubic(progress),
      )
      if (progress < 1) {
        scrollFrameRef.current = window.requestAnimationFrame(step)
      } else {
        scrollFrameRef.current = null
      }
    }

    scrollFrameRef.current = window.requestAnimationFrame(step)
  }, [getAudio])

  const startMonitor = useCallback(() => {
    if (monitorFrameRef.current !== null) {
      window.cancelAnimationFrame(monitorFrameRef.current)
    }

    const tick = () => {
      if (!autoRunningRef.current) {
        monitorFrameRef.current = null
        return
      }

      const audio = getAudio()
      const nextId = nextSectionRef.current
      if (audio && nextId && !transitionStartedRef.current) {
        const duration = audio.duration
        if (Number.isFinite(duration) && duration > 0) {
          const nextSection = document.getElementById(nextId)
          if (nextSection) {
            const distance = Math.abs(
              getSectionScrollTarget(nextSection) - window.scrollY,
            )
            const remaining = duration - audio.currentTime
            if (remaining <= transitionSecondsFor(distance)) {
              startTransition()
            }
          }
        }
      }

      monitorFrameRef.current = window.requestAnimationFrame(tick)
    }

    monitorFrameRef.current = window.requestAnimationFrame(tick)
  }, [getAudio, startTransition])

  const finishScene = useCallback(() => {
    if (!autoRunningRef.current) return
    const nextId = nextSectionRef.current
    cancelFrames()

    if (!nextId) {
      stopRun()
      return
    }

    const section = document.getElementById(nextId)
    if (section) window.scrollTo(0, getSectionScrollTarget(section))
    playSceneRef.current(nextId)
  }, [cancelFrames, stopRun])

  useLayoutEffect(() => {
    finishSceneRef.current = finishScene
  }, [finishScene])

  const playScene = useCallback(
    (sectionId: string) => {
      if (!autoRunningRef.current) return

      cancelFrames()
      currentSectionRef.current = sectionId
      transitionStartedRef.current = false

      const index = sectionOrder.indexOf(sectionId)
      const nextId = sectionOrder[index + 1] ?? null
      nextSectionRef.current = nextId
      if (nextId) preload(audioSceneForSection(nextId))

      speakAudio(audioSceneForSection(sectionId), {
        onEnded: () => finishSceneRef.current(),
        onError: () => stopRun(),
      })
      startMonitor()
    },
    [cancelFrames, preload, speakAudio, startMonitor, stopRun],
  )

  useLayoutEffect(() => {
    playSceneRef.current = playScene
  }, [playScene])

  const beginRun = useCallback(
    (sectionId: string) => {
      autoRunningRef.current = true
      setAutoRunning(true)
      playScene(sectionId)
    },
    [playScene],
  )

  const interruptRun = useCallback(() => {
    if (!autoRunningRef.current) return
    stopRun()
    stopAudio()
    speakAudio('paused')
  }, [speakAudio, stopAudio, stopRun])

  useEffect(() => {
    return () => {
      autoRunningRef.current = false
      cancelFrames()
    }
  }, [cancelFrames])

  useEffect(() => {
    const isGuideControl = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(
        target.closest('.guide__kai-button, .guide__start, .guide__close'),
      )

    const interruptOnPointerDown = (event: PointerEvent) => {
      if (isGuideControl(event.target)) return
      interruptRun()
    }
    const interruptOnTouchStart = (event: TouchEvent) => {
      if (isGuideControl(event.target)) return
      interruptRun()
    }
    const interruptOnKeyDown = (event: KeyboardEvent) => {
      if (isGuideControl(event.target)) return
      if (
        [
          'ArrowDown',
          'ArrowUp',
          'PageDown',
          'PageUp',
          'Home',
          'End',
          ' ',
        ].includes(event.key)
      ) {
        interruptRun()
      }
    }

    document.addEventListener('pointerdown', interruptOnPointerDown, true)
    document.addEventListener('keydown', interruptOnKeyDown, true)
    window.addEventListener('wheel', interruptRun, { passive: true })
    window.addEventListener('touchstart', interruptOnTouchStart, {
      passive: true,
    })

    return () => {
      document.removeEventListener('pointerdown', interruptOnPointerDown, true)
      document.removeEventListener('keydown', interruptOnKeyDown, true)
      window.removeEventListener('wheel', interruptRun)
      window.removeEventListener('touchstart', interruptOnTouchStart)
    }
  }, [interruptRun])

  function startAssistant() {
    if (!audioSupported || locale === 'en') return
    const sectionId = onStart()
    setStarted(true)
    setOpen(true)
    beginRun(sectionId)
  }

  function toggleAssistant() {
    if (locale === 'en') return
    if (!started) {
      startAssistant()
      return
    }
    if (autoRunningRef.current) {
      interruptRun()
      return
    }
    beginRun(onStart())
  }

  function closeGuide() {
    stopRun()
    setStarted(false)
    setOpen(false)
    stopAudio()
  }

  const phase: KaiPhase = !started
    ? 'idle'
    : !autoRunning
      ? 'paused'
      : activeSection === 'project'
        ? 'project'
        : 'greeting'

  const progressRatio =
    audioProgress.duration > 0
      ? clamp01(audioProgress.currentTime / audioProgress.duration)
      : 0

  const kaiLabel = !open
    ? t.guide.open
    : locale === 'en'
      ? t.guide.unavailableInEnglish
      : !started
        ? t.guide.start
        : autoRunning
          ? t.guide.interrupt
          : t.guide.continue

  return (
    <aside
      className={`guide ${open ? 'guide--open' : 'guide--closed'}`}
      aria-label={t.guide.title}
    >
      {open && (
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
              <X size={14} aria-hidden="true" />
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
              {audioProgress.duration > 0 && (
                <div className="guide__progress" aria-hidden="true">
                  <span style={{ transform: `scaleX(${progressRatio})` }} />
                </div>
              )}
            </>
          )}

          {locale === 'es' && (
            <div className="guide__controls">
              {!started ? (
                <button
                  type="button"
                  className="guide__control guide__start"
                  onClick={startAssistant}
                  disabled={!audioSupported}
                  title={
                    !audioSupported ? t.guide.unsupportedVoice : undefined
                  }
                >
                  <Play size={12} aria-hidden="true" />
                  {t.guide.start}
                </button>
              ) : autoRunning ? (
                <button
                  type="button"
                  className="guide__control"
                  onClick={interruptRun}
                >
                  <Pause size={12} aria-hidden="true" />
                  {t.guide.interrupt}
                </button>
              ) : (
                <button
                  type="button"
                  className="guide__control guide__start"
                  onClick={toggleAssistant}
                  disabled={!audioSupported}
                >
                  <Play size={12} aria-hidden="true" />
                  {t.guide.continue}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {!open && (
        <span className="guide__hint" aria-hidden="true">
          {t.guide.open}
        </span>
      )}

      <button
        type="button"
        className="guide__kai-button"
        onClick={open ? toggleAssistant : () => setOpen(true)}
        aria-label={kaiLabel}
        aria-pressed={autoRunning}
      >
        <KaiCharacter phase={phase} talking={audioProgress.isPlaying} />
      </button>
    </aside>
  )
}
