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

  const addNewRow = useCallback(
    (items: UniqueIdentifier[] = []) => {
      const newRow = rowsUtils.createNewRow(createdRows, items)
      setCreatedRows((prev) => prev + 1)
      setRows((prev) => ({ ...prev, [newRow.id]: newRow }))
      setRowContainers((prev) =>
        prev.includes(Number(newRow.id)) ? prev : [...prev, Number(newRow.id)]
      )
    },
    [createdRows]
  )

  const addItemToRow = useCallback(
    (rowId: UniqueIdentifier, items: UniqueIdentifier[]) =>
      setRows(rowsUtils.addItem(rowId, items)),
    []
  )

  const deleteRow = useCallback((rowId: UniqueIdentifier) => {
    setRows(rowsUtils.removeRow(rowId))
    setRowContainers((prev) =>
      prev.filter((containerId) => containerId !== rowId)
    )
  }, [])

  const deleteItemFromRow = useCallback(
    (rowId: UniqueIdentifier) => (itemId: string) =>
      setRows(rowsUtils.removeItemFromRow(rowId, itemId)),
    []
  )

  const changeCategoryName = useCallback(
    (rowId: UniqueIdentifier, value: string) =>
      setRows(rowsUtils.changeCategoryName(rowId, value)),
    []
  )

  const changeAligment = useCallback(
    (rowId: UniqueIdentifier, aligment: Alignment) =>
      setRows(rowsUtils.changeAligment(rowId, aligment)),
    []
  )

  const handleMoveRows = useCallback(
    (activeId: number, overId: number) => {
      const activeIndex = rowContainers.indexOf(activeId)
      const overIndex = rowContainers.indexOf(overId)

      if (activeIndex === -1 || overIndex === -1) return

      setRowContainers((prev) => arrayMove(prev, activeIndex, overIndex))
    },
    [rowContainers]
  )

  return {
    rows,
    rowContainers,
    addNewRow,
    addItemToRow,
    deleteRow,
    changeCategoryName,
    handleMoveRows,
    deleteItemFromRow,
    setRowContainers,
    setRows,
    changeAligment
  }
}
