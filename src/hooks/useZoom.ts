import { useState } from 'react'

export default function useZoom() {
  const [zoom, setZoom] = useState<number>(1)

  const increaseZoom = () =>
    setZoom((prev) => {
      if (prev >= 1) return prev
      return +parseFloat(String(prev + 0.1)).toFixed(1)
    })

  const decreaseZoom = () =>
    setZoom((prev) => {
      if (prev <= 0.3) return prev
      return +parseFloat(String(prev - 0.1)).toFixed(1)
    })

  return {
    zoom,
    increaseZoom,
    decreaseZoom
  }
}
