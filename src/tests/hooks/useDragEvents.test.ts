/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { useDragEvents } from '@hooks/useDragEvents'
import { RowState } from '@hooks/useRows'
import { UniqueIdentifier } from '@dnd-kit/core'
import { NEW_ROW_ID } from '@utils/rows'

describe('useDragEvents', () => {
  const mockSetActiveId = vi.fn()
  const mockHandleDragOver = vi.fn()
  const mockHandleDragEnd = vi.fn()
  const mockSetRowContainers = vi.fn()

  const defaultRows: RowState = {
    1: { id: 1, items: ['item1', 'item2'], name: 'Row 1', alignment: 'left' },
    2: { id: 2, items: ['item3'], name: 'Row 2', alignment: 'left' }
  }

  const defaultProps = {
    rowsState: {
      rows: defaultRows,
      rowContainers: [1, 2] as UniqueIdentifier[],
      addNewRow: vi.fn(),
      deleteItemFromRow: vi.fn(() => vi.fn()),
      deleteRow: vi.fn(),
      handleMoveRows: vi.fn(),
      setRowContainers: mockSetRowContainers,
      setRows: vi.fn(),
      addItemToRow: vi.fn(),
      changeCategoryName: vi.fn(),
      changeAligment: vi.fn()
    },
    dragDrop: {
      handleDragOver: mockHandleDragOver,
      handleDragEnd: mockHandleDragEnd
    },
    setActiveId: mockSetActiveId
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('onDragOver', () => {
    test('should do nothing when overId is null', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragOver({
        active: { id: 'item1', rect: { current: { translated: {} } } },
        over: null
      } as any)

      expect(mockHandleDragOver).not.toHaveBeenCalled()
      expect(mockHandleDragEnd).not.toHaveBeenCalled()
    })

    test('should handle row container reordering', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragOver({
        active: { id: 1, rect: { current: { translated: {} } } },
        over: { id: 2, rect: {} }
      } as any)

      expect(mockSetRowContainers).toHaveBeenCalled()
    })

    test('should prevent movement when target container has 3 items', () => {
      const rowsWithThreeItems = {
        ...defaultRows,
        2: { ...defaultRows[2], items: ['item3', 'item4', 'item5'] }
      }

      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          rowsState: { ...defaultProps.rowsState, rows: rowsWithThreeItems },
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragOver({
        active: { id: 'item1', rect: { current: { translated: {} } } },
        over: { id: 'item3', rect: {} }
      } as any)

      expect(mockHandleDragOver).not.toHaveBeenCalled()
    })

    test('should handle movement between different containers', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragOver({
        active: {
          id: 'item1',
          rect: { current: { translated: { some: 'data' } } }
        },
        over: { id: 'item3', rect: { some: 'data' } }
      } as any)

      expect(mockHandleDragOver).toHaveBeenCalledWith(
        'item1',
        'item3',
        1,
        2,
        { some: 'data' },
        { some: 'data' }
      )
    })

    test('should handle movement within same container', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragOver({
        active: {
          id: 'item1',
          rect: { current: { translated: {} } }
        },
        over: { id: 'item2', rect: {} }
      } as any)

      expect(mockHandleDragEnd).toHaveBeenCalledWith('item1', 'item2', 1, 1)
    })
  })

  describe('onDragEnd', () => {
    test('should handle null overId', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragEnd({
        active: { id: 'item1' },
        over: null
      } as any)

      expect(mockSetActiveId).toHaveBeenCalledWith(null)
    })

    test('should handle null activeContainer', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragEnd({
        active: { id: 'nonexistent' },
        over: { id: 'item1' }
      } as any)

      expect(mockSetActiveId).toHaveBeenCalledWith(null)
    })

    test('should handle row position changes', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragEnd({
        active: { id: 1 },
        over: { id: 2 }
      } as any)

      expect(defaultProps.rowsState.handleMoveRows).toHaveBeenCalledWith(1, 2)
    })

    test('should handle new row creation when dropping on NEW_ROW_ID with one item ', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragEnd({
        active: { id: 'item3' },
        over: { id: NEW_ROW_ID }
      } as any)

      // When row has only one item, it should delete the row
      expect(defaultProps.rowsState.deleteRow).toHaveBeenCalledWith(2)
      expect(defaultProps.rowsState.addNewRow).toHaveBeenCalledWith(['item3'])
    })

    test('should handle new row creation when dropping on NEW_ROW_ID', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragEnd({
        active: { id: 'item1' },
        over: { id: NEW_ROW_ID }
      } as any)

      // When row has only one item, it should delete the row
      expect(defaultProps.rowsState.deleteItemFromRow).toHaveBeenCalledWith(1)
      expect(defaultProps.rowsState.addNewRow).toHaveBeenCalledWith(['item1'])
    })

    test('should prevent movement when target container has 3 items', () => {
      const rowsWithThreeItems = {
        ...defaultRows,
        2: { ...defaultRows[2], items: ['item3', 'item4', 'item5'] }
      }

      const props = {
        ...defaultProps,
        rowsState: {
          ...defaultProps.rowsState,
          rows: rowsWithThreeItems
        },
        recentlyMovedToNewContainer: { current: false }
      }

      const { result } = renderHook(() => useDragEvents(props))

      result.current.onDragEnd({
        active: { id: 'item1' },
        over: { id: 'item3' }
      } as any)

      expect(mockHandleDragEnd).not.toHaveBeenCalled()
    })

    test('should handle normal drag end between containers', () => {
      const { result } = renderHook(() =>
        useDragEvents({
          ...defaultProps,
          recentlyMovedToNewContainer: { current: false }
        })
      )

      result.current.onDragEnd({
        active: { id: 'item1' },
        over: { id: 'item3' }
      } as any)

      expect(mockHandleDragEnd).toHaveBeenCalledWith('item1', 'item3', 1, 2)
      expect(mockSetActiveId).toHaveBeenCalledWith(null)
    })

    test('should clean up empty rows', () => {
      const rowsWithEmptyRow: RowState = {
        ...defaultRows,
        3: { id: 3, items: [], name: 'Empty Row', alignment: 'left' }
      }

      const props = {
        ...defaultProps,
        rowsState: {
          ...defaultProps.rowsState,
          rows: rowsWithEmptyRow
        },
        recentlyMovedToNewContainer: { current: false }
      }

      const { result } = renderHook(() => useDragEvents(props))

      result.current.onDragEnd({
        active: { id: 'item1' },
        over: { id: 'item3' }
      } as any)

      expect(props.rowsState.deleteRow).toHaveBeenCalledWith(3)
    })
  })
})
