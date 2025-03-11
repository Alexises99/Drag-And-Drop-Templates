import { startTransition, useCallback } from 'react'
import { RowState } from './useRows'
import dragDropUtils from '@utils/drag-drop'
import { arrayMove } from '@dnd-kit/sortable'
import { ClientRect, UniqueIdentifier } from '@dnd-kit/core'

export function useDragDrop(
  rows: RowState,
  updateRows: (updater: (prev: RowState) => RowState) => void,
  updateRowContainers: (
    updater: (prev: UniqueIdentifier[]) => UniqueIdentifier[]
  ) => void
) {
  const getItemIndexes = useCallback(
    (
      activeId: UniqueIdentifier,
      overId: UniqueIdentifier,
      activeContainer: UniqueIdentifier,
      overContainer: UniqueIdentifier
    ) => ({
      activeIndex: dragDropUtils.getIndex(rows, activeContainer, activeId),
      overIndex: dragDropUtils.getIndex(rows, overContainer, overId),
      overItems: rows[overContainer]?.items || []
    }),
    [rows]
  )

  const reorderItems = useCallback(
    (items: UniqueIdentifier[], fromIndex: number, toIndex: number) =>
      arrayMove(items, fromIndex, toIndex),
    []
  )

  const handleDragOver = useCallback(
    (
      activeId: UniqueIdentifier,
      overId: UniqueIdentifier,
      activeContainer: UniqueIdentifier,
      overContainer: UniqueIdentifier,
      activeRect: ClientRect | null,
      overRect: ClientRect
    ) => {
      if (!rows[activeContainer] || !rows[overContainer]) return

      const { activeIndex, overIndex, overItems } = getItemIndexes(
        activeId,
        overId,
        activeContainer,
        overContainer
      )

      let newIndex
      if (overId in rows) {
        newIndex = overItems.length + 1
      } else {
        const isBelow =
          activeRect && activeRect.right > overRect.right + overRect.width
        const modifier = isBelow ? 1 : 0
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      const deleteContainer = rows[activeContainer].items.length === 1

      updateRows((state) => {
        const updatedRows = { ...state }
        updatedRows[activeContainer] = {
          ...updatedRows[activeContainer],
          items: updatedRows[activeContainer].items.filter(
            (item) => item !== activeId
          )
        }

        updatedRows[overContainer] = {
          ...updatedRows[overContainer],
          items: [
            ...updatedRows[overContainer].items.slice(0, newIndex),
            state[activeContainer].items[activeIndex],
            ...updatedRows[overContainer].items.slice(newIndex)
          ]
        }

        return updatedRows
      })

      if (deleteContainer) {
        startTransition(() => {
          updateRowContainers((prev) =>
            prev.filter((container) => container !== activeContainer)
          )
          updateRows((state) => {
            const updatedRows = { ...state }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [activeContainer]: _, ...rest } = updatedRows
            return rest
          })
        })
      }
    },
    [rows, updateRows, getItemIndexes, updateRowContainers]
  )

  const handleDragEnd = useCallback(
    (
      activeId: UniqueIdentifier,
      overId: UniqueIdentifier,
      activeContainer: UniqueIdentifier,
      overContainer: UniqueIdentifier
    ) => {
      if (!rows[activeContainer] || !rows[overContainer]) return

      const { activeIndex, overIndex } = getItemIndexes(
        activeId,
        overId,
        activeContainer,
        overContainer
      )

      if (activeIndex !== overIndex) {
        updateRows((state) => ({
          ...state,
          [overContainer]: {
            ...state[overContainer],
            items: reorderItems(
              state[overContainer].items,
              activeIndex,
              overIndex
            )
          }
        }))
      }
    },
    [rows, updateRows, getItemIndexes, reorderItems]
  )

  return {
    handleDragEnd,
    handleDragOver
  }
}
