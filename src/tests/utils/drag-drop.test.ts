import { describe, test, expect } from 'vitest'
import dragDropUtils from '@utils/drag-drop'
import type { DragItem } from '@types'

describe('dragDropUtils', () => {
  const mockRows: Record<string, DragItem> = {
    'row-1': {
      id: 'row-1',
      items: ['item-1', 'item-2', 'item-3']
    },
    'row-2': {
      id: 'row-2',
      items: ['item-4', 'item-5']
    }
  }

  describe('findContainer', () => {
    test('finds container when activeItemId is a row', () => {
      const result = dragDropUtils.findContainer(mockRows, 'row-1')
      expect(result).toBe('row-1')
    })

    test('finds container when activeItemId is an item', () => {
      const result = dragDropUtils.findContainer(mockRows, 'item-1')
      expect(result).toBe('row-1')
    })

    test('returns undefined when item is not found', () => {
      const result = dragDropUtils.findContainer(mockRows, 'non-existent')
      expect(result).toBeUndefined()
    })
  })

  describe('getItemIndex', () => {
    test('returns correct index for existing item', () => {
      const result = dragDropUtils.getItemIndex(mockRows, 'item-2')
      expect(result).toBe(1)
    })

    test('returns -1 when item is not found', () => {
      const result = dragDropUtils.getItemIndex(mockRows, 'non-existent')
      expect(result).toBe(-1)
    })

    test('returns -1 when container is not found', () => {
      const result = dragDropUtils.getItemIndex({}, 'item-1')
      expect(result).toBe(-1)
    })
  })

  describe('getIndex', () => {
    test('returns correct index for item in specified container', () => {
      const result = dragDropUtils.getIndex(mockRows, 'row-1', 'item-3')
      expect(result).toBe(2)
    })

    test('returns -1 when item is not in specified container', () => {
      const result = dragDropUtils.getIndex(mockRows, 'row-1', 'item-4')
      expect(result).toBe(-1)
    })

    test('handles items from different containers', () => {
      const result = dragDropUtils.getIndex(mockRows, 'row-2', 'item-5')
      expect(result).toBe(1)
    })
  })
})
