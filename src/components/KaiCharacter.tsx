import { useEffect, useRef, useState } from 'react'
import kaiIdle from '../assets/kai/kai-idle.webp'
import kaiBlink from '../assets/kai/kai-blink.webp'
import kaiGuide from '../assets/kai/kai-guide.webp'
import kaiSurprise from '../assets/kai/kai-surprise.webp'
import kaiPaused from '../assets/kai/kai-paused.webp'

export type KaiPhase =
  | 'idle'
  | 'surprise'
  | 'greeting'
  | 'project'
  | 'paused'

interface KaiCharacterProps {
  phase: KaiPhase
  talking: boolean
}

export function KaiCharacter({ phase, talking }: KaiCharacterProps) {
  const [blinking, setBlinking] = useState(false)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setBlinking(true)
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
      closeTimer.current = window.setTimeout(() => setBlinking(false), 220)
    }, 4200)

    return () => {
      window.clearInterval(interval)
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    }
  }, [])

  // Seleccionar sprite según el estado y comportamiento de la mascota
  let currentSrc = kaiIdle
  if (phase === 'paused') {
    currentSrc = kaiPaused
  } else if (phase === 'surprise') {
    currentSrc = kaiSurprise
  } else if (phase === 'project' || phase === 'greeting' || talking) {
    currentSrc = blinking ? kaiBlink : kaiGuide
  } else if (blinking) {
    currentSrc = kaiBlink
  }

  return (
    <div
      className={`kai-character kai-character--${phase}${
        talking ? ' is-talking' : ''
      }`}
      aria-hidden="true"
    >
      <div className="kai-character__figure">
        <img
          className="kai-character__sprite"
          src={currentSrc}
          alt="KAI — Mascota Guía"
          draggable={false}
        />
      </div>
    </div>
  )
}
