import { RefObject, useEffect } from 'react'

export function useScrollIntoView(
  expanded: boolean,
  cardRef: RefObject<HTMLDivElement>
): void {
  useEffect(() => {
    if (expanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [expanded, cardRef])
}
