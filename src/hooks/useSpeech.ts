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

const emptyProgress: AudioProgress = {
  isPlaying: false,
  error: false,
  currentTime: 0,
  duration: 0,
}

export function useSpeech() {
  const supported =
    typeof window !== 'undefined' &&
    'Audio' in window
  const [audioProgress, setAudioProgress] =
    useState<AudioProgress>(emptyProgress)
  const currentAudio = useRef<HTMLAudioElement | null>(null)

  const stop = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause()
      currentAudio.current.currentTime = 0
      currentAudio.current = null
    }
    setAudioProgress(emptyProgress)
  }, [])

  const speak = useCallback(
    (
      scene: AudioScene,
      onEnded?: () => void,
      onError?: () => void,
    ) => {
      if (!supported) return

      stop()

      const audioPath = `${import.meta.env.BASE_URL}audio/kai/es/${scene}.mp3`
      const audio = new Audio(audioPath)
      currentAudio.current = audio
      setAudioProgress({
        isPlaying: false,
        error: false,
        currentTime: 0,
        duration: 0,
      })

      audio.onloadedmetadata = () => {
        if (currentAudio.current !== audio) return
        setAudioProgress((progress) => ({
          ...progress,
          duration: Number.isFinite(audio.duration) ? audio.duration : 0,
        }))
      }
      audio.ontimeupdate = () => {
        if (currentAudio.current !== audio) return
        setAudioProgress((progress) => ({
          ...progress,
          currentTime: audio.currentTime,
          duration: Number.isFinite(audio.duration)
            ? audio.duration
            : progress.duration,
        }))
      }
      audio.onplay = () => {
        if (currentAudio.current !== audio) return
        setAudioProgress((progress) => ({ ...progress, isPlaying: true }))
      }
      audio.onended = () => {
        if (currentAudio.current !== audio) return
        setAudioProgress((progress) => ({ ...progress, isPlaying: false }))
        currentAudio.current = null
        onEnded?.()
      }
      audio.onerror = () => {
        if (currentAudio.current !== audio) return
        currentAudio.current = null
        setAudioProgress({
          isPlaying: false,
          error: true,
          currentTime: 0,
          duration: 0,
        })
        onError?.()
      }

      audio.play().catch(() => {
        if (currentAudio.current !== audio) return
        currentAudio.current = null
        setAudioProgress({
          isPlaying: false,
          error: true,
          currentTime: 0,
          duration: 0,
        })
        onError?.()
      })
    },
    [stop, supported],
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
  }
}
