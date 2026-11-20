import { useCallback, useEffect, useState } from 'react'
import { projects } from '../data/projects'
import { scrollToSection } from '../lib/scroll'

const homeId = 'inicio'
const closingId = 'closing'

function sectionIdFromHash(): string | null {
  const id = window.location.hash.slice(1)
  return id === homeId || id === closingId || projects.some((project) => project.id === id)
    ? id
    : null
}

function currentSectionId(): string {
  const markerY = window.innerHeight * 0.35
  const sections = [homeId, ...projects.map((project) => project.id), closingId]
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null)

  const sectionAtMarker = sections.find((section) => {
    const rect = section.getBoundingClientRect()
    return rect.top <= markerY && rect.bottom > markerY
  })

  if (sectionAtMarker) return sectionAtMarker.id

  return (
    sections.reduce<HTMLElement | null>((nearest, section) => {
      const rect = section.getBoundingClientRect()
      const distance =
        markerY < rect.top
          ? rect.top - markerY
          : markerY > rect.bottom
            ? markerY - rect.bottom
            : 0
      if (!nearest) return section
      const nearestRect = nearest.getBoundingClientRect()
      const nearestDistance =
        markerY < nearestRect.top
          ? nearestRect.top - markerY
          : markerY > nearestRect.bottom
            ? markerY - nearestRect.bottom
            : 0
      return distance < nearestDistance ? section : nearest
    }, null)?.id ?? homeId
  )
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
}

export function useActiveProject() {
  const [activeId, setActiveId] = useState<string>(() =>
    sectionIdFromHash() ?? homeId,
  )
  const refreshActiveSection = useCallback(() => {
    const id = currentSectionId()
    setActiveId(id)
    return id
  }, [])

  useEffect(() => {
    const sections = [homeId, ...projects.map((project) => project.id), closingId]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    let updateTimer: number | null = null

    const updateActiveSection = () => {
      updateTimer = null
      setActiveId(currentSectionId())
    }

    const scheduleActiveSectionUpdate = () => {
      if (updateTimer !== null) window.clearTimeout(updateTimer)
      updateTimer = window.setTimeout(updateActiveSection, 350)
    }

    const observer = new IntersectionObserver(
      scheduleActiveSectionUpdate,
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0, 0.2, 0.5, 0.8],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const onScroll = () => scheduleActiveSectionUpdate()
    const scrollToHash = () => {
      const id = sectionIdFromHash()
      if (!id) {
        scheduleActiveSectionUpdate()
        return
      }

      scrollToSection(id, scrollBehavior())
      scheduleActiveSectionUpdate()
    }

    const initialId = sectionIdFromHash()
    if (initialId) {
      requestAnimationFrame(() => {
        scrollToSection(initialId, 'auto')
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', scrollToHash)
    scheduleActiveSectionUpdate()

    return () => {
      if (updateTimer !== null) window.clearTimeout(updateTimer)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  return {
    activeId,
    isHome: activeId === homeId,
    isClosing: activeId === closingId,
    refreshActiveSection,
  }
}
