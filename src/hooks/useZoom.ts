import { useState } from 'react'

const MIN_ZOOM = 0.3
const MAX_ZOOM = 1

export default function useZoom() {
  const [zoom, setZoom] = useState<number>(1)

  const increaseZoom = () =>
    setZoom((prev) => {
      if (prev >= MAX_ZOOM) return prev
      return +parseFloat(String(prev + 0.1)).toFixed(1)
    })

  const decreaseZoom = () =>
    setZoom((prev) => {
      if (prev <= MIN_ZOOM) return prev
      return +parseFloat(String(prev - 0.1)).toFixed(1)
    })

  return {
    zoom,
    increaseZoom,
    decreaseZoom
  }
}
