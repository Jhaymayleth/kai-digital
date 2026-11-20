/**
 * Utilidades de desplazamiento compartidas por la navegación y el recorrido
 * guiado.
 *
 * Cada sección es un panel de viewport con `padding-block` simétrico igual al
 * alto del header. Por eso su borde superior es el punto exacto que deja el
 * contenido centrado en el área visible: no hace falta descontar el header.
 */

export function getHeaderHeight(): number {
  const header = document.querySelector<HTMLElement>('.site-header')
  return header?.getBoundingClientRect().height ?? 0
}

export function getSectionScrollTarget(section: HTMLElement): number {
  const top = section.getBoundingClientRect().top + window.scrollY
  return Math.max(0, Math.round(top))
}

export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = 'smooth',
): void {
  const section = document.getElementById(sectionId)
  if (!section) return
  window.scrollTo({ top: getSectionScrollTarget(section), behavior })
}
