import { useCallback, useState, TouchEvent, MouseEvent, RefObject } from 'react'

export function useHorizontalDrag(sliderRef: RefObject<HTMLElement | null>) {
  const [dragging, setDragging] = useState<boolean>(false)

  const [startX, setStartX] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)

  const handleTouchStart = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (!sliderRef.current) return
      setDragging(true)
      setStartX(
        ('touches' in e ? e.touches[0].pageX : e.pageX) -
          sliderRef.current.offsetLeft
      )
      setScrollLeft(sliderRef.current.scrollLeft)
    },
    [sliderRef]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (!dragging || !sliderRef.current) return
      const x =
        ('touches' in e ? e.touches[0].pageX : e.pageX) -
        sliderRef.current.offsetLeft
      const walk = x - startX
      sliderRef.current.scrollLeft = scrollLeft - walk
    },
    [dragging, scrollLeft, startX, sliderRef]
  )

  const handleTouchEnd = useCallback(() => setDragging(false), [])

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    dragging
  }
}
