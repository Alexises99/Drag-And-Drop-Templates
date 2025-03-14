import { renderHook, act } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { useRows } from '@hooks/useRows'

describe('useRows', () => {
  test('initializes with empty rows and containers', () => {
    const { result } = renderHook(() => useRows())

    expect(result.current.rows).toEqual({})
    expect(result.current.rowContainers).toEqual([])
  })

  describe('addNewRow', () => {
    test('adds new row without items', () => {
      const { result } = renderHook(() => useRows())

      act(() => {
        result.current.addNewRow()
      })

      expect(Object.keys(result.current.rows)).toHaveLength(1)
      expect(result.current.rowContainers).toEqual([1])
      expect(result.current.rows[1].items).toEqual([])
    })

    test('adds new row with items', () => {
      const { result } = renderHook(() => useRows())
      const items = ['item-1', 'item-2']

      act(() => {
        result.current.addNewRow(items)
      })

      expect(result.current.rows[1].items).toEqual(items)
    })
  })

  describe('addItemToRow', () => {
    test('adds items to existing row', () => {
      const { result } = renderHook(() => useRows())

      act(() => {
        result.current.addNewRow()
        result.current.addItemToRow(1, ['item-1'])
      })

      expect(result.current.rows[1].items).toContain('item-1')
    })
  })

  describe('deleteRow', () => {
    test('removes row and updates containers', () => {
      const { result } = renderHook(() => useRows())

      act(() => {
        result.current.addNewRow()
        result.current.deleteRow(1)
      })

      expect(result.current.rows[1]).toBeUndefined()
      expect(result.current.rowContainers).not.toContain(1)
    })
  })

  describe('deleteItemFromRow', () => {
    test('removes item from row', () => {
      const { result } = renderHook(() => useRows())

      act(() => result.current.addNewRow(['item-1']))

      act(() => result.current.deleteItemFromRow(1)('item-1'))

      expect(result.current.rows[1].items).not.toContain('item-1')
    })
  })

  describe('changeCategoryName', () => {
    test('updates row name', () => {
      const { result } = renderHook(() => useRows())

      act(() => {
        result.current.addNewRow()
        result.current.changeCategoryName(1, 'New Name')
      })

      expect(result.current.rows[1].name).toBe('New Name')
    })
  })

  describe('changeAlignment', () => {
    test('updates row alignment', () => {
      const { result } = renderHook(() => useRows())

      act(() => {
        result.current.addNewRow()
        result.current.changeAligment(1, 'center')
      })

      expect(result.current.rows[1].alignment).toBe('center')
    })
  })

  describe('handleMoveRows', () => {
    test('reorders rows correctly', () => {
      const { result } = renderHook(() => useRows())

      act(() => result.current.addNewRow())

      act(() => result.current.addNewRow())

      act(() => result.current.handleMoveRows(1, 2))

      expect(result.current.rowContainers).toEqual([2, 1])
    })
  })

  describe('state updates optimization', () => {
    test('prevents unnecessary updates in updateRows', () => {
      const { result } = renderHook(() => useRows())

      act(() => {
        result.current.setRows((prev) => prev)
      })

      expect(result.current.rows).toEqual({})
    })

    test('prevents unnecessary updates in updateRowContainers', () => {
      const { result } = renderHook(() => useRows())

      act(() => {
        result.current.setRowContainers((prev) => prev)
      })

      expect(result.current.rowContainers).toEqual([])
    })
  })
})
