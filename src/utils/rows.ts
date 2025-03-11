import { UniqueIdentifier } from '@dnd-kit/core'
import { RowState } from '@hooks/useRows'
import type { Row } from '@types'

function createNewRow(size: number, initialItems?: UniqueIdentifier[]) {
  const newRow: Row = {
    alignment: 'left',
    id: size + 1,
    items: initialItems ?? [],
    name: 'Sin nombre'
  }

  return newRow
}

function addItem(rowId: UniqueIdentifier, item: UniqueIdentifier) {
  return (state: RowState) => {
    const row = state[rowId]
    if (!row) return state
    if (row.items.includes(item)) return state

    return {
      ...state,
      [rowId]: { ...row, items: [...row.items, item] }
    }
  }
}

function removeRow(rowId: UniqueIdentifier) {
  return (state: RowState) => {
    if (!(rowId in state)) return state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [rowId]: _, ...newRows } = state
    return newRows
  }
}

function changeCategoryName(rowId: UniqueIdentifier, value: string) {
  return (state: RowState) => {
    const row = state[rowId]
    if (!row || row.name === value) return state
    return {
      ...state,
      [rowId]: { ...row, name: value }
    }
  }
}

function removeItemFromRow(rowId: UniqueIdentifier, itemId: UniqueIdentifier) {
  return (state: RowState) => {
    const copy = { ...state }
    if (!copy[rowId].items.includes(itemId)) return state
    return {
      ...copy,
      [rowId]: {
        ...copy[rowId],
        items: copy[rowId].items.filter((item) => item !== itemId)
      }
    }
  }
}

const rowsUtils = {
  createNewRow,
  addItem,
  removeRow,
  changeCategoryName,
  removeItemFromRow
}

export default rowsUtils
