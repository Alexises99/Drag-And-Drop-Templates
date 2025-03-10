import {
  useCallback,
  useState,
  TouchEvent,
  MouseEvent,
  RefObject,
  useRef,
  useEffect
} from 'react'

export function useHorizontalDrag(sliderRef: RefObject<HTMLElement | null>) {
  const [dragging, setDragging] = useState<boolean>(false)

  const startX = useRef<number>(0)
  const scrollLeft = useRef<number>(0)

  useEffect(() => {
    console.log(sliderRef.current)
    if (!sliderRef.current) return
    const container = sliderRef.current
    const itemWidth = container.children[1]?.clientWidth + 16 || 200
    console.log(itemWidth)
  }, [sliderRef])

  const handleTouchStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!sliderRef.current) return
      setDragging(true)
      startX.current =
        ('touches' in e ? e.touches[0].pageX : e.pageX) -
        sliderRef.current.offsetLeft
      scrollLeft.current = sliderRef.current.scrollLeft
    },
    [sliderRef]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (!dragging || !sliderRef.current) return
      const x =
        ('touches' in e ? e.touches[0].pageX : e.pageX) -
        sliderRef.current.offsetLeft
      const walk = x - startX.current
      sliderRef.current.scrollLeft = scrollLeft.current - walk
    },
    [dragging, scrollLeft, startX, sliderRef]
  )

  const handleTouchEnd = useCallback(() => setDragging(false), [])

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return

    const itemWidth = sliderRef.current.children[0]?.clientWidth
    console.log(sliderRef.current.children[0].clientWidth)

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -itemWidth : itemWidth,
      behavior: 'smooth'
    })
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    scroll,
    dragging
  }
}
