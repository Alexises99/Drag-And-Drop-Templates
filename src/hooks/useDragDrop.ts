import { Dispatch, SetStateAction, useCallback } from 'react'
import { RowState } from './useRows'
import dragDropUtils from '@utils/drag-drop'
import { arrayMove } from '@dnd-kit/sortable'
import { ClientRect, UniqueIdentifier } from '@dnd-kit/core'

/**
 * Custom hook to handle drag-and-drop functionality for managing row items.
 * @param {RowState} rows - The current state of rows.
 * @param {(updater: (prev: RowState) => RowState) => void} updateRows - Function to update the row state.
 * @returns {object} Handlers for drag over and drag end events.
 */
export function useDragDrop(
  rows: RowState,
  updateRows: Dispatch<SetStateAction<RowState>>
) {
  /**
   * Retrieves indexes of the active and over items in their respective containers.
   * @param {UniqueIdentifier} activeId - The ID of the dragged item.
   * @param {UniqueIdentifier} overId - The ID of the item being hovered over.
   * @param {UniqueIdentifier} activeContainer - The container of the active item.
   * @param {UniqueIdentifier} overContainer - The container of the over item.
   * @returns {object} Object containing active index, over index, and over items.
   */
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

  /**
   * Handles the drag-over event, updating the row state accordingly.
   * @param {UniqueIdentifier} activeId - The ID of the dragged item.
   * @param {UniqueIdentifier} overId - The ID of the hovered item.
   * @param {UniqueIdentifier} activeContainer - The container of the active item.
   * @param {UniqueIdentifier} overContainer - The container of the hovered item.
   * @param {ClientRect | null} activeRect - The bounding rect of the active item.
   * @param {ClientRect} overRect - The bounding rect of the hovered item.
   */
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

      const isBelow =
        activeRect && activeRect.right > overRect.right + overRect.width
      const newIndex =
        overId in rows
          ? overItems.length + 1
          : overIndex >= 0
            ? overIndex + (isBelow ? 1 : 0)
            : overItems.length + 1

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
    },
    [rows, updateRows, getItemIndexes]
  )

  /**
   * Handles the drag-end event, updating the row state accordingly.
   * @param {UniqueIdentifier} activeId - The ID of the dragged item.
   * @param {UniqueIdentifier} overId - The ID of the hovered item.
   * @param {UniqueIdentifier} activeContainer - The container of the active item.
   * @param {UniqueIdentifier} overContainer - The container of the hovered item.
   */
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

      if (overIndex >= 0 && activeIndex !== overIndex) {
        updateRows((state) => {
          return {
            ...state,
            [overContainer]: {
              ...state[overContainer],
              items: arrayMove(
                state[overContainer].items,
                activeIndex,
                overIndex
              )
            }
          }
        })
      }
    },
    [rows, updateRows, getItemIndexes]
  )

  return {
    handleDragEnd,
    handleDragOver
  }
}
