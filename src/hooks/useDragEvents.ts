import { DragEndEvent, DragOverEvent, UniqueIdentifier } from '@dnd-kit/core'
import dragDropUtils from '@utils/drag-drop'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useRows } from './useRows'
import { arrayMove } from '@dnd-kit/sortable'
import { useDragDrop } from './useDragDrop'
import { NEW_ROW_ID } from '@utils/rows'
import { MAX_PRODUCTS } from '@utils/products'

interface useDragEventsArgs {
  rowsState: ReturnType<typeof useRows>
  dragDrop: ReturnType<typeof useDragDrop>
  setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
}

export function useDragEvents({
  rowsState,
  dragDrop,
  setActiveId
}: useDragEventsArgs) {
  const {
    addNewRow,
    deleteItemFromRow,
    deleteRow,
    handleMoveRows,
    rowContainers,
    rows,
    setRowContainers
  } = rowsState

  const { handleDragEnd, handleDragOver } = dragDrop

  const findContainers = useCallback(
    (activeId: UniqueIdentifier, overId: UniqueIdentifier) => ({
      activeContainer: dragDropUtils.findContainer(rows, activeId),
      overContainer: dragDropUtils.findContainer(rows, overId)
    }),
    [rows]
  )

  const removeEmptyRows = useCallback(() => {
    const emptyRows = Object.values(rows)
      .filter((row) => row.items.length === 0)
      .map((row) => row.id)
    if (emptyRows.length > 0) deleteRow(emptyRows[0])
  }, [rows, deleteRow])

  const moveRowContainers = (
    activeContainer: UniqueIdentifier,
    overContainer: UniqueIdentifier
  ) => {
    const activeIndex = Object.keys(rows)
      .map(Number)
      .indexOf(activeContainer as number)
    const overIndex = Object.keys(rows)
      .map(Number)
      .indexOf(overContainer as number)

    console.log({ activeIndex, overIndex })
    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
      return
    setRowContainers((state) => arrayMove(state, activeIndex, overIndex))
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const overId = over.id
    const activeId = active.id
    // Active.id in rows for move containers

    const { activeContainer, overContainer } = findContainers(activeId, overId)

    if (!activeContainer || !overContainer) return

    // Reorder rows list
    if (rowContainers.includes(activeId)) {
      moveRowContainers(activeContainer, overContainer)
      return
    }

    // Moving product to another container, avoid more than 3 items
    if (
      activeContainer !== overContainer &&
      rows[overContainer].items.length >= MAX_PRODUCTS
    ) {
      setActiveId(null)
      return
    }

    // Move items between containers
    if (activeContainer !== overContainer) {
      handleDragOver(
        activeId,
        overId,
        activeContainer,
        overContainer,
        active.rect.current.translated,
        over.rect
      )
    } else {
      // Move items inside the same container
      handleDragEnd(activeId, overId, activeContainer, overContainer)
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const overId = over.id
    const activeId = active.id

    const { activeContainer, overContainer } = findContainers(activeId, overId)

    if (!activeContainer) {
      setActiveId(null)
      return
    }

    // Change row position
    if (rowContainers.includes(activeId)) {
      handleMoveRows(activeId as number, overId as number)
      return
    }

    // Create new row in add row button
    if (overId === NEW_ROW_ID) {
      if (rows[activeContainer].items.length === 1) {
        deleteRow(activeContainer)
      } else {
        deleteItemFromRow(activeContainer)(activeId as string)
        // Check if some row is empty after create a new row (row with only one product moved to NEW_ROW)
        removeEmptyRows()
      }
      addNewRow([activeId])
      return
    }

    if (
      !overContainer ||
      (activeContainer !== overContainer &&
        rows[overContainer].items.length >= MAX_PRODUCTS)
    )
      return

    handleDragEnd(activeId, overId, activeContainer, overContainer)
    removeEmptyRows()

    setActiveId(null)
  }

  return {
    onDragEnd,
    onDragOver
  }
}
