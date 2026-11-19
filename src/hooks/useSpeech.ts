import { useCallback, useEffect, useState } from 'react'
import type { Locale } from '../types/content'

export function useSpeech(locale: Locale) {
  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window
  const [enabled, setEnabled] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  const speak = useCallback(
    (text: string) => {
      if (!supported || !enabled || !text) return

      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = locale === 'es' ? 'es-ES' : 'en-US'
      utterance.rate = 1
      utterance.pitch = 1.05

      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)

      window.speechSynthesis.speak(utterance)
    },
    [enabled, locale, supported],
  )

  useEffect(() => {
    if (!supported) return

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [supported])

  return {
    supported,
    enabled,
    setEnabled,
    speaking,
    speak,
    stop,
  }
}
