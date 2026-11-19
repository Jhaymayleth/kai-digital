import { useEffect, useRef, useState } from 'react'
import baseAvatar from '../assets/avatar/base.png'
import browsAvatar from '../assets/avatar/brows.png'
import eyesClosedAvatar from '../assets/avatar/eyes-closed.png'
import eyesOpenAvatar from '../assets/avatar/eyes-open.png'
import mouthIdleAvatar from '../assets/avatar/mouth-idle.png'
import mouthTalkAvatar from '../assets/avatar/mouth-talk.png'

export type AvatarPhase =
  | 'idle'
  | 'surprise'
  | 'greeting'
  | 'project'
  | 'paused'

interface KritaAvatarProps {
  phase: AvatarPhase
  talking: boolean
}

export function KritaAvatar({ phase, talking }: KritaAvatarProps) {
  const [blinking, setBlinking] = useState(false)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setBlinking(true)
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
      closeTimer.current = window.setTimeout(() => setBlinking(false), 140)
    }, 5200)

    return () => {
      window.clearInterval(interval)
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    }
  }, [])

  const eyes =
    blinking && phase !== 'surprise' && phase !== 'paused'
      ? eyesClosedAvatar
      : eyesOpenAvatar

  return (
    <div
      className={`krita-avatar krita-avatar--${phase}${
        talking ? ' is-talking' : ''
      }`}
      aria-hidden="true"
    >
      <div className="krita-avatar__figure">
        <img
          className="krita-avatar__layer krita-avatar__base"
          src={baseAvatar}
          alt=""
          draggable={false}
        />
        <img
          className="krita-avatar__layer krita-avatar__brows"
          src={browsAvatar}
          alt=""
          draggable={false}
        />
        <img
          className="krita-avatar__layer krita-avatar__eyes"
          src={eyes}
          alt=""
          draggable={false}
        />
        <img
          className="krita-avatar__layer krita-avatar__mouth"
          src={mouthIdleAvatar}
          alt=""
          draggable={false}
        />
        <img
          className="krita-avatar__layer krita-avatar__mouth-talk"
          src={mouthTalkAvatar}
          alt=""
          draggable={false}
        />
      </div>
    </div>
  )
}
