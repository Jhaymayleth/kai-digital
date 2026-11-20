import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProjectId } from '../types/content'

export type AudioScene =
  | ProjectId
  | 'welcome'
  | 'closing'
  | 'paused'
  | 'resume'
  | 'surprise'

export interface AudioProgress {
  isPlaying: boolean
  error: boolean
  currentTime: number
  duration: number
}

export interface SpeakOptions {
  onEnded?: () => void
  onError?: () => void
}

const AUDIO_BASE = `${import.meta.env.BASE_URL}audio/kai/es/`

const emptyProgress: AudioProgress = {
  isPlaying: false,
  error: false,
  currentTime: 0,
  duration: 0,
}

function audioPath(scene: AudioScene) {
  return `${AUDIO_BASE}${scene}.mp3`
}

/**
 * Reproduce las escenas de KAI con un único elemento `<audio>` reutilizado.
 *
 * Se expone `getAudio()` para que el scroll cinematográfico pueda leer
 * `currentTime` directamente en cada frame: el audio es el reloj maestro y el
 * desplazamiento se deriva de él, no de temporizadores paralelos.
 */
export function useSpeech() {
  const supported =
    typeof window !== 'undefined' && typeof window.Audio !== 'undefined'
  const [audioProgress, setAudioProgress] =
    useState<AudioProgress>(emptyProgress)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const tokenRef = useRef(0)
  const preloadedRef = useRef<Map<AudioScene, HTMLAudioElement>>(new Map())

  const getAudio = useCallback(() => audioRef.current, [])

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.preload = 'auto'
      audio.setAttribute('aria-hidden', 'true')
      audio.style.display = 'none'
      document.body.appendChild(audio)
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const stop = useCallback(() => {
    tokenRef.current += 1
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.onended = null
      audio.onerror = null
      audio.onloadedmetadata = null
      audio.ontimeupdate = null
      audio.onplay = null
      try {
        audio.currentTime = 0
      } catch {
        // El elemento puede no tener metadata todavía.
      }
    }
    setAudioProgress(emptyProgress)
  }, [])

  const preload = useCallback(
    (scene: AudioScene) => {
      if (!supported) return
      const cache = preloadedRef.current
      if (cache.has(scene)) return
      const audio = new Audio(audioPath(scene))
      audio.preload = 'auto'
      audio.load()
      cache.set(scene, audio)
    },
    [supported],
  )

  const speak = useCallback(
    (scene: AudioScene, options: SpeakOptions = {}) => {
      if (!supported) {
        options.onError?.()
        return
      }

      stop()
      const token = tokenRef.current
      const audio = ensureAudio()
      audio.src = audioPath(scene)
      try {
        audio.currentTime = 0
      } catch {
        // Ignorado: `play()` cargará el recurso igualmente.
      }
      setAudioProgress({
        isPlaying: false,
        error: false,
        currentTime: 0,
        duration: 0,
      })

      const isCurrent = () =>
        tokenRef.current === token && audioRef.current === audio

      audio.onloadedmetadata = () => {
        if (!isCurrent()) return
        setAudioProgress((progress) => ({
          ...progress,
          duration: Number.isFinite(audio.duration) ? audio.duration : 0,
        }))
      }
      audio.ontimeupdate = () => {
        if (!isCurrent()) return
        setAudioProgress((progress) => ({
          ...progress,
          currentTime: audio.currentTime,
          duration: Number.isFinite(audio.duration)
            ? audio.duration
            : progress.duration,
        }))
      }
      audio.onplay = () => {
        if (!isCurrent()) return
        setAudioProgress((progress) => ({ ...progress, isPlaying: true }))
      }
      audio.onended = () => {
        if (!isCurrent()) return
        setAudioProgress((progress) => ({ ...progress, isPlaying: false }))
        options.onEnded?.()
      }
      audio.onerror = () => {
        if (!isCurrent()) return
        setAudioProgress({
          isPlaying: false,
          error: true,
          currentTime: 0,
          duration: 0,
        })
        options.onError?.()
      }

      const playPromise = audio.play()
      if (playPromise) {
        playPromise.catch(() => {
          if (!isCurrent()) return
          setAudioProgress({
            isPlaying: false,
            error: true,
            currentTime: 0,
            duration: 0,
          })
          options.onError?.()
        })
      }
    },
    [ensureAudio, stop, supported],
  )

  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return {
    supported,
    audioProgress,
    speak,
    stop,
    preload,
    getAudio,
  }
}
