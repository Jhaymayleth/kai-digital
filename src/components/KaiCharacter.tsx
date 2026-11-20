import { useEffect, useRef, useState } from 'react'
import kaiIdle from '../assets/kai/kai-idle.webp'
import kaiIdle160 from '../assets/kai/kai-idle-160.webp'
import kaiIdle320 from '../assets/kai/kai-idle-320.webp'
import kaiBlink from '../assets/kai/kai-blink.webp'
import kaiBlink160 from '../assets/kai/kai-blink-160.webp'
import kaiBlink320 from '../assets/kai/kai-blink-320.webp'
import kaiGuide from '../assets/kai/kai-guide.webp'
import kaiGuide160 from '../assets/kai/kai-guide-160.webp'
import kaiGuide320 from '../assets/kai/kai-guide-320.webp'
import kaiSurprise from '../assets/kai/kai-surprise.webp'
import kaiSurprise160 from '../assets/kai/kai-surprise-160.webp'
import kaiSurprise320 from '../assets/kai/kai-surprise-320.webp'
import kaiPaused from '../assets/kai/kai-paused.webp'
import kaiPaused160 from '../assets/kai/kai-paused-160.webp'
import kaiPaused320 from '../assets/kai/kai-paused-320.webp'

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

interface Sprite {
  src: string
  srcSet: string
}

function sprite(full: string, medium: string, small: string): Sprite {
  return {
    src: full,
    srcSet: `${small} 160w, ${medium} 320w, ${full} 429w`,
  }
}

const SPRITES = {
  idle: sprite(kaiIdle, kaiIdle320, kaiIdle160),
  blink: sprite(kaiBlink, kaiBlink320, kaiBlink160),
  guide: sprite(kaiGuide, kaiGuide320, kaiGuide160),
  surprise: sprite(kaiSurprise, kaiSurprise320, kaiSurprise160),
  paused: sprite(kaiPaused, kaiPaused320, kaiPaused160),
} satisfies Record<string, Sprite>

const PRELOAD = [kaiIdle320, kaiBlink320, kaiGuide320, kaiSurprise320, kaiPaused320]

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

  // Precarga de sprites para que el cambio de fase no provoque parpadeos.
  useEffect(() => {
    const images = PRELOAD.map((src) => {
      const image = new Image()
      image.src = src
      return image
    })
    return () => {
      images.forEach((image) => {
        image.src = ''
      })
    }
  }, [])

  let current = SPRITES.idle
  if (phase === 'paused') {
    current = SPRITES.paused
  } else if (phase === 'surprise') {
    current = SPRITES.surprise
  } else if (phase === 'project' || phase === 'greeting' || talking) {
    current = blinking ? SPRITES.blink : SPRITES.guide
  } else if (blinking) {
    current = SPRITES.blink
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
          src={current.src}
          srcSet={current.srcSet}
          sizes="(max-width: 760px) 64px, 120px"
          alt=""
          width={429}
          height={939}
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  )
}
