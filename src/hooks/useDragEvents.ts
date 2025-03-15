import { DragEndEvent, DragOverEvent, UniqueIdentifier } from '@dnd-kit/core'
import dragDropUtils from '@utils/drag-drop'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useRows } from './useRows'
import { arrayMove } from '@dnd-kit/sortable'
import { useDragDrop } from './useDragDrop'
import { NEW_ROW_ID } from '@utils/rows'

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

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    const overId = over?.id
    const activeId = active.id
    // Active.id in rows for move containers

    if (!overId) return

    const { activeContainer, overContainer } = findContainers(activeId, overId)

    if (!activeContainer || !overContainer) return

    // Reorder rows list
    if (rowContainers.includes(activeId)) {
      const activeIndex = Object.keys(rows)
        .map(Number)
        .indexOf(activeContainer as number)
      const overIndex = Object.keys(rows)
        .map(Number)
        .indexOf(overContainer as number)

      if (overIndex === activeIndex) return
      setRowContainers((state) => arrayMove(state, activeIndex, overIndex))
      return
    }

    // Moving product to another container, avoid more than 3 items
    if (
      activeContainer !== overContainer &&
      rows[overContainer].items.length >= 3
    ) {
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

    const overId = over?.id
    const activeId = active.id

    if (!overId) {
      setActiveId(null)
      return
    }

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
        const toDeleteRow = Object.values(rows)
          .filter((row) => row.items.length === 0)
          .map((row) => row.id)

        if (toDeleteRow.length !== 0) deleteRow(toDeleteRow[0])
      }

      addNewRow([activeId])

      return
    }

    if (!overContainer) return

    if (
      activeContainer !== overContainer &&
      rows[overContainer].items.length >= 3
    )
      return

    // TODO REFACTOR Check if some row is empty after create a new row (row with only one product moved to NEW_ROW)
    const toDeleteRow = Object.values(rows)
      .filter((row) => row.items.length === 0)
      .map((row) => row.id)

    if (toDeleteRow.length !== 0) deleteRow(toDeleteRow[0])

    handleDragEnd(activeId, overId, activeContainer, overContainer)

    setActiveId(null)
  }

  return {
    onDragEnd,
    onDragOver
  }
}
