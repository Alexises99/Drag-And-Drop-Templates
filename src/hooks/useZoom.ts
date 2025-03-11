import { useState } from 'react'

export default function useZoom() {
  const [zoom, setZoom] = useState<number>(1)

  const increaseZoom = () =>
    setZoom((prev) => {
      if (prev >= 1) return prev
      return prev + 0.1
    })

  const decreaseZoom = () =>
    setZoom((prev) => {
      if (prev <= 0) return prev
      return prev - 0.1
    })

  return {
    zoom,
    increaseZoom,
    decreaseZoom
  }
}
