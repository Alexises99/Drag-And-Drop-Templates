import Product from '@components/Product/Product'
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useTemplate } from '@hooks/useTemplate'
import dragDropUtils from '@utils/drag-drop'
import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

import Row from '@components/Row/Row'
import productUtils from '@utils/products'
import RowContainer from '@components/RowContainer'
import { NEW_ROW_ID } from '@utils/rows'

export default function DragDrop() {
  const {
    rows: rowsState,
    dragDrop: { handleDragEnd, handleDragOver },
    products: { productsData },
    zoom: { zoom }
  } = useTemplate()

  const {
    addNewRow,
    deleteItemFromRow,
    handleMoveRows,
    rowContainers,
    rows,
    setRowContainers,
    deleteRow
  } = rowsState

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const isOrderingContainer =
    activeId != null ? rowContainers.includes(activeId) : false

  const findContainers = useCallback(
    (activeId: UniqueIdentifier, overId: UniqueIdentifier) => ({
      activeContainer: dragDropUtils.findContainer(rows, activeId),
      overContainer: dragDropUtils.findContainer(rows, overId)
    }),
    [rows]
  )

  const onDragStart = (event: DragStartEvent) => setActiveId(event.active.id)

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    const overId = over?.id
    const activeId = active.id
    // Active.id in rows for move containers

    if (!overId) return

    const { activeContainer, overContainer } = findContainers(activeId, overId)

    console.log({ activeContainer, overContainer, activeId, rows })

    if (!activeContainer || !overContainer) return

    // Reorder rows list
    if (rowContainers.includes(activeId)) {
      const activeIndex = Object.keys(rows)
        .map(Number)
        .indexOf(activeContainer as number)
      const overIndex = Object.keys(rows)
        .map(Number)
        .indexOf(overContainer as number)

      if (overIndex !== activeIndex) return
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

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
      onDragAbort={() => setActiveId(null)}
    >
      <SortableContext items={[...rowContainers, NEW_ROW_ID]}>
        <RowContainer isOrderingContainer={isOrderingContainer} />
      </SortableContext>
      {zoom === 1
        ? createPortal(
            <DragOverlay dropAnimation={dropAnimation}>
              {activeId ? (
                <div>
                  {rowContainers.includes(activeId as number) ? (
                    <Row openDialog={() => null} row={rows[activeId]} />
                  ) : (
                    <Product
                      product={productUtils.getProduct(
                        activeId as string,
                        productsData
                      )}
                    />
                  )}
                </div>
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
  )
}
