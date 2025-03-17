import { describe, test, expect } from 'vitest'
import rowsUtils, { initialName } from '@utils/rows'
import type { RowState } from '@hooks/useRows'

describe('rowsUtils', () => {
  const mockInitialState: RowState = {
    'row-1': {
      id: 'row-1',
      name: 'Test Row',
      items: ['item-1', 'item-2'],
      alignment: 'left'
    }
  }

  describe('createNewRow', () => {
    const { length } = Object.keys(mockInitialState)
    test('creates new row with default values', () => {
      const newRow = rowsUtils.createNewRow(length)
      expect(newRow).toEqual({
        alignment: 'left',
        id: length + 1,
        items: [],
        name: initialName
      })
    })

    test('creates new row with initial items', () => {
      const initialItems = ['item-1', 'item-2']
      const newRow = rowsUtils.createNewRow(length, initialItems)
      expect(newRow.items).toEqual(initialItems)
    })
  })

  describe('addItem', () => {
    test('adds new items to existing row', () => {
      const newItems = ['item-3', 'item-4']
      const updatedState = rowsUtils.addItem(
        'row-1',
        newItems
      )(mockInitialState)
      expect(updatedState['row-1'].items).toContain('item-3')
      expect(updatedState['row-1'].items).toContain('item-4')
    })

    test('returns same state if row does not exist', () => {
      const newItems = ['item-3']
      const updatedState = rowsUtils.addItem(
        'non-existent',
        newItems
      )(mockInitialState)
      expect(updatedState).toEqual(mockInitialState)
    })

    test('returns same state if items already exist in row', () => {
      const existingItems = ['item-1', 'item-2']
      const updatedState = rowsUtils.addItem(
        'row-1',
        existingItems
      )(mockInitialState)
      expect(updatedState).toEqual(mockInitialState)
    })
  })

  describe('removeRow', () => {
    test('removes existing row', () => {
      const updatedState = rowsUtils.removeRow('row-1')(mockInitialState)
      expect(updatedState['row-1']).toBeUndefined()
    })

    test('returns same state if row does not exist', () => {
      const updatedState = rowsUtils.removeRow('non-existent')(mockInitialState)
      expect(updatedState).toEqual(mockInitialState)
    })
  })

  describe('changeCategoryName', () => {
    test('updates row name', () => {
      const newName = 'New Row Name'
      const updatedState = rowsUtils.changeCategoryName(
        'row-1',
        newName
      )(mockInitialState)
      expect(updatedState['row-1'].name).toBe(newName)
    })

    test('returns same state if row does not exist', () => {
      const updatedState = rowsUtils.changeCategoryName(
        'non-existent',
        'New Name'
      )(mockInitialState)
      expect(updatedState).toEqual(mockInitialState)
    })

    test('returns same state if name is unchanged', () => {
      const updatedState = rowsUtils.changeCategoryName(
        'row-1',
        'Test Row'
      )(mockInitialState)
      expect(updatedState).toEqual(mockInitialState)
    })
  })

  describe('changeAlignment', () => {
    test('updates row alignment', () => {
      const updatedState = rowsUtils.changeAlignment(
        'row-1',
        'center'
      )(mockInitialState)
      expect(updatedState['row-1'].alignment).toBe('center')
    })

    test('returns same state if row does not exist', () => {
      const updatedState = rowsUtils.changeAlignment(
        'non-existent',
        'right'
      )(mockInitialState)
      expect(updatedState).toEqual(mockInitialState)
    })

    test('returns same state if alignment is unchanged', () => {
      const updatedState = rowsUtils.changeAlignment(
        'row-1',
        'left'
      )(mockInitialState)
      expect(updatedState).toEqual(mockInitialState)
    })
  })

  describe('removeItemFromRow', () => {
    test('removes item from row', () => {
      const updatedState = rowsUtils.removeItemFromRow(
        'row-1',
        'item-1'
      )(mockInitialState)
      expect(updatedState['row-1'].items).not.toContain('item-1')
      expect(updatedState['row-1'].items.length).toBe(1)
    })

    test('returns same state if item does not exist in row', () => {
      const updatedState = rowsUtils.removeItemFromRow(
        'row-1',
        'non-existent'
      )(mockInitialState)
      expect(updatedState).toEqual(mockInitialState)
    })
  })
})
