import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { Alignment, Row } from '@types'
import rowsUtils from '@utils/rows'
import { startTransition, useCallback, useState } from 'react'

export type RowState = Record<UniqueIdentifier, Row>

export function useRows() {
  const [rows, setRows] = useState<RowState>({})

  // Change order of containers easily
  const [rowContainers, setRowContainers] = useState<UniqueIdentifier[]>(
    Object.keys(rows).map(Number)
  )

  // Avoid re-renders
  const updateRows = useCallback((updater: (prev: RowState) => RowState) => {
    setRows((prev) => {
      const newState = updater(prev)
      return newState !== prev ? newState : prev
    })
  }, [])

  const updateRowContainers = useCallback(
    (updater: (prev: UniqueIdentifier[]) => UniqueIdentifier[]) => {
      setRowContainers((prev) => {
        const newState = updater(prev)
        return newState !== prev ? newState : prev
      })
    },
    []
  )

  const addNewRow = useCallback(
    (items: UniqueIdentifier[] = []) => {
      const size = Object.keys(rows).length
      const newRow = rowsUtils.createNewRow(size, items)

      startTransition(() => {
        updateRows((prev) => ({ ...prev, [newRow.id]: newRow }))
        updateRowContainers((prev) => [...prev, Number(newRow.id)])
      })
    },
    [rows, updateRows, updateRowContainers]
  )

  const addItemToRow = useCallback(
    (rowId: UniqueIdentifier, items: UniqueIdentifier[]) => {
      updateRows(rowsUtils.addItem(rowId, items))
    },
    [updateRows]
  )

  const deleteRow = (rowId: UniqueIdentifier) => {
    startTransition(() => {
      updateRows(rowsUtils.removeRow(rowId))
      updateRowContainers((prev) =>
        prev.filter((containerId) => containerId !== rowId)
      )
    })
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
