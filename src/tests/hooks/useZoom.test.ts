import { renderHook, act } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import useZoom from '@hooks/useZoom'

describe('useZoom', () => {
  test('initializes with zoom value of 1', () => {
    const { result } = renderHook(() => useZoom())
    expect(result.current.zoom).toBe(1)
  })

  describe('decreaseZoom', () => {
    test('decreases zoom by 0.1', () => {
      const { result } = renderHook(() => useZoom())

      act(() => {
        result.current.decreaseZoom()
      })

      expect(result.current.zoom).toBe(0.9)
    })

    test('does not decrease zoom below 0.3', () => {
      const { result } = renderHook(() => useZoom())

      // Decrease zoom multiple times
      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.decreaseZoom()
        }
      })

      expect(result.current.zoom).toBe(0.3)
    })
  })

  describe('increaseZoom', () => {
    test('increases zoom by 0.1 when below 1', () => {
      const { result } = renderHook(() => useZoom())

      // First decrease zoom
      act(() => {
        result.current.decreaseZoom()
      })
      expect(result.current.zoom).toBe(0.9)

      // Then increase zoom
      act(() => {
        result.current.increaseZoom()
      })
      expect(result.current.zoom).toBe(1)
    })

    test('does not increase zoom above 1', () => {
      const { result } = renderHook(() => useZoom())

      act(() => {
        result.current.increaseZoom()
      })

      expect(result.current.zoom).toBe(1)
    })
  })

  test('maintains precision to one decimal place', () => {
    const { result } = renderHook(() => useZoom())

    act(() => {
      result.current.decreaseZoom()
      result.current.decreaseZoom()
    })

    expect(result.current.zoom).toBe(0.8)
  })
})
