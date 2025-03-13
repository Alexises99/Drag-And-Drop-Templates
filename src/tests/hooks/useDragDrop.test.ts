import { renderHook } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { useDragDrop } from '@hooks/useDragDrop'
import type { RowState } from '@hooks/useRows'

describe('useDragDrop', () => {
  const mockRows: RowState = {
    'row-1': {
      id: 'row-1',
      name: 'Row 1',
      items: ['item-1', 'item-2', 'item-3'],
      alignment: 'left'
    },
    'row-2': {
      id: 'row-2',
      name: 'Row 2',
      items: ['item-4', 'item-5'],
      alignment: 'left'
    }
  }

  const mockUpdateRows = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('handleDragOver', () => {
    test('moves item between containers', () => {
      const { result } = renderHook(() => useDragDrop(mockRows, mockUpdateRows))

      result.current.handleDragOver(
        'item-1',
        'item-4',
        'row-1',
        'row-2',
        { top: 0, left: 0, bottom: 10, right: 10, width: 100, height: 100 },
        { top: 0, left: 0, bottom: 10, right: 10, width: 100, height: 100 }
      )

      expect(mockUpdateRows).toHaveBeenCalled()
      const updateFn = mockUpdateRows.mock.calls[0][0]
      const newState = updateFn(mockRows)

      expect(newState['row-1'].items).not.toContain('item-1')
      expect(newState['row-2'].items).toContain('item-1')
    })

    test('does nothing if container does not exist', () => {
      const { result } = renderHook(() => useDragDrop(mockRows, mockUpdateRows))

      result.current.handleDragOver(
        'item-1',
        'item-4',
        'non-existent',
        'row-2',
        null,
        { top: 0, left: 0, bottom: 10, right: 10, width: 100, height: 100 }
      )

      expect(mockUpdateRows).not.toHaveBeenCalled()
    })
  })

  describe('handleDragEnd', () => {
    test('reorders items within same container', () => {
      const { result } = renderHook(() => useDragDrop(mockRows, mockUpdateRows))

      result.current.handleDragEnd('item-1', 'item-2', 'row-1', 'row-1')

      expect(mockUpdateRows).toHaveBeenCalled()
      const updateFn = mockUpdateRows.mock.calls[0][0]
      const newState = updateFn(mockRows)

      expect(newState['row-1'].items).toEqual(['item-2', 'item-1', 'item-3'])
    })

    test('does nothing if indexes are the same', () => {
      const { result } = renderHook(() => useDragDrop(mockRows, mockUpdateRows))

      result.current.handleDragEnd('item-1', 'item-1', 'row-1', 'row-1')

      expect(mockUpdateRows).not.toHaveBeenCalled()
    })

    test('does nothing if container does not exist', () => {
      const { result } = renderHook(() => useDragDrop(mockRows, mockUpdateRows))

      result.current.handleDragEnd('item-1', 'item-4', 'non-existent', 'row-2')

      expect(mockUpdateRows).not.toHaveBeenCalled()
    })
  })
})
