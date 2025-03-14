import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { Alignment, Row } from '@types'
import rowsUtils from '@utils/rows'
import { useCallback, useState } from 'react'

export type RowState = Record<UniqueIdentifier, Row>

export function useRows() {
  const [createdRows, setCreatedRows] = useState<number>(0)
  const [rows, setRows] = useState<RowState>({})

  // Change order of containers easily
  const [rowContainers, setRowContainers] = useState<UniqueIdentifier[]>(
    Object.keys(rows).map(Number)
  )

  // Avoid re-renders
  const updateRows = useCallback(
    (updater: (prev: RowState) => RowState) => setRows((prev) => updater(prev)),
    []
  )

  const updateRowContainers = useCallback(
    (updater: (prev: UniqueIdentifier[]) => UniqueIdentifier[]) =>
      setRowContainers((prev) => updater(prev)),
    []
  )

  const addNewRow = useCallback(
    (items: UniqueIdentifier[] = []) => {
      const newRow = rowsUtils.createNewRow(createdRows, items)
      setCreatedRows((prev) => prev + 1)
      updateRows((prev) => ({ ...prev, [newRow.id]: newRow }))
      updateRowContainers((prev) =>
        prev.includes(newRow.id) ? prev : [...prev, Number(newRow.id)]
      )
    },
    [updateRows, updateRowContainers, createdRows]
  )

  const addItemToRow = useCallback(
    (rowId: UniqueIdentifier, items: UniqueIdentifier[]) => {
      updateRows(rowsUtils.addItem(rowId, items))
    },
    [updateRows]
  )

  const deleteRow = (rowId: UniqueIdentifier) => {
    updateRows(rowsUtils.removeRow(rowId))
    updateRowContainers((prev) =>
      prev.filter((containerId) => containerId !== rowId)
    )
  }

  const deleteItemFromRow = (rowId: UniqueIdentifier) => (itemId: string) => {
    updateRows(rowsUtils.removeItemFromRow(rowId, itemId))
  }

  const changeCategoryName = (rowId: UniqueIdentifier, value: string) => {
    updateRows(rowsUtils.changeCategoryName(rowId, value))
  }

  const changeAligment = (rowId: UniqueIdentifier, aligment: Alignment) => {
    updateRows(rowsUtils.changeAligment(rowId, aligment))
  }

  const handleMoveRows = (activeId: number, overId: number) => {
    const activeIndex = rowContainers.indexOf(activeId)
    const overIndex = rowContainers.indexOf(overId)

    updateRowContainers((prev) => arrayMove(prev, activeIndex, overIndex))
  }

  return {
    rows,
    rowContainers,
    addNewRow,
    addItemToRow,
    deleteRow,
    changeCategoryName,
    handleMoveRows,
    deleteItemFromRow,
    updateRows,
    updateRowContainers,
    changeAligment
  }
}
