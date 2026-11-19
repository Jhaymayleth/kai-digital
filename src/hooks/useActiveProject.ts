import { useEffect, useState } from 'react'
import { projects } from '../data/projects'

function projectIdFromHash(): string | null {
  const id = window.location.hash.slice(1)
  return projects.some((project) => project.id === id) ? id : null
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
}

export function useActiveProject() {
  const [activeId, setActiveId] = useState<string | null>(() =>
    projectIdFromHash(),
  )

  useEffect(() => {
    const sections = projects
      .map((project) => document.getElementById(project.id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0, 0.2, 0.5, 0.8],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const scrollToHash = () => {
      const id = projectIdFromHash()
      if (!id) {
        setActiveId(null)
        return
      }

      setActiveId(id)
      document.getElementById(id)?.scrollIntoView({
        behavior: scrollBehavior(),
        block: 'start',
      })
    }

    const initialId = projectIdFromHash()
    if (initialId) {
      requestAnimationFrame(() => {
        document.getElementById(initialId)?.scrollIntoView({
          block: 'start',
        })
      })
    }

    window.addEventListener('hashchange', scrollToHash)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  return activeId
}
