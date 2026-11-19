import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { useSpeech } from '../hooks/useSpeech'
import type { Dictionary } from '../i18n/dictionary'
import type { Locale, Project } from '../types/content'
import { KritaAvatar, type AvatarPhase } from './KritaAvatar'

interface AvatarGuideProps {
  activeProject: Project | null
}

function narrationFor(
  project: Project,
  locale: Locale,
  t: Dictionary,
): string {
  return t.guide.project
    .replace('{name}', project.name)
    .replace('{tagline}', project.tagline[locale])
    .replace('{stack}', project.stack.join(', '))
}

export function AvatarGuide({ activeProject }: AvatarGuideProps) {
  const { locale, t } = useLanguage()
  const {
    supported: voiceSupported,
    enabled: voiceEnabled,
    setEnabled: setVoiceEnabled,
    speaking: voiceSpeaking,
    speak: speakVoice,
    stop: stopVoice,
  } = useSpeech(locale)
  const [started, setStarted] = useState(false)
  const [surprised, setSurprised] = useState(false)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState(true)
  const [resumeNoteFor, setResumeNoteFor] = useState<string | null>(null)
  const [talking, setTalking] = useState(false)
  const lastSpoken = useRef('')

  useEffect(() => {
    const surpriseTimer = window.setTimeout(() => setSurprised(true), 3000)
    const welcomeTimer = window.setTimeout(() => {
      setSurprised(false)
      setStarted(true)
    }, 4300)

    return () => {
      window.clearTimeout(surpriseTimer)
      window.clearTimeout(welcomeTimer)
    }
  }, [])

  const showResumeNote =
    activeProject !== null && resumeNoteFor === activeProject.id

  const message = !started
    ? surprised
      ? t.guide.surprise
      : ''
    : paused
      ? t.guide.paused
      : showResumeNote
        ? t.guide.resumeNote
        : activeProject
          ? narrationFor(activeProject, locale, t)
          : t.guide.welcome

  const phase: AvatarPhase = paused
    ? 'paused'
    : !started
      ? surprised
        ? 'surprise'
        : 'idle'
      : activeProject
        ? 'project'
        : 'greeting'

  useEffect(() => {
    if (paused || !message) {
      const hideTimer = window.setTimeout(() => setTalking(false), 0)
      return () => window.clearTimeout(hideTimer)
    }

    const startTimer = window.setTimeout(() => setTalking(true), 0)
    const stopTimer = window.setTimeout(
      () => setTalking(false),
      Math.min(7000, 1400 + message.length * 26),
    )

    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(stopTimer)
    }
  }, [message, paused])

  useEffect(() => {
    if (!voiceEnabled) {
      lastSpoken.current = ''
      return
    }

    if (paused || !message || lastSpoken.current === message) return

    lastSpoken.current = message
    speakVoice(message)
  }, [message, paused, voiceEnabled, speakVoice])

  function togglePause() {
    const nextPaused = !paused
    setPaused(nextPaused)
    setResumeNoteFor(!nextPaused && activeProject ? activeProject.id : null)

    if (nextPaused) stopVoice()
  }

  function toggleVoice() {
    if (!voiceSupported) return

    if (voiceEnabled) {
      stopVoice()
      setVoiceEnabled(false)
      lastSpoken.current = ''
      return
    }

    lastSpoken.current = ''
    setVoiceEnabled(true)
  }

  function closeGuide() {
    setOpen(false)
    stopVoice()
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

  return (
    <aside className="guide" aria-label={t.guide.title}>
      <div className="guide__bubble">
        <div className="guide__bubble-head">
          <p className="eyebrow">{t.guide.title}</p>
          <button
            type="button"
            className="guide__close"
            onClick={closeGuide}
            aria-label={t.guide.close}
          >
            ×
          </button>
        </div>

        <p
          className={message ? 'guide__message' : 'guide__message guide__message--empty'}
          role="status"
          aria-live="polite"
        >
          {message || '…'}
        </p>

        <div className="guide__controls">
          <button
            type="button"
            className="guide__control"
            onClick={togglePause}
            aria-pressed={paused}
          >
            {paused ? t.guide.resume : t.guide.pause}
          </button>
          <button
            type="button"
            className="guide__control"
            onClick={toggleVoice}
            aria-pressed={voiceEnabled}
            disabled={!voiceSupported}
            title={!voiceSupported ? t.guide.unsupportedVoice : undefined}
          >
            {voiceEnabled ? t.guide.voiceOff : t.guide.voiceOn}
          </button>
        </div>
      </div>

      <button
        type="button"
        className="guide__avatar-button"
        onClick={togglePause}
        aria-label={paused ? t.guide.resume : t.guide.pause}
      >
        <KritaAvatar phase={phase} talking={talking || voiceSpeaking} />
      </button>
    </aside>
  )
}
