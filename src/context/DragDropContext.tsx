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
import { PropsWithChildren, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { NEW_ROW_ID } from './TemplateContext'
import Row from '@components/Row/Row'
import productUtils from '@utils/products'

export default function DragDropContext({ children }: PropsWithChildren) {
  const {
    rows: rowsState,
    dragDrop: { handleDragEnd, handleDragOver },
    products: { productsData }
    // zoom: { zoom },
  } = useTemplate()

  const {
    addNewRow,
    deleteItemFromRow,
    handleMoveRows,
    rowContainers,
    rows,
    updateRowContainers
  } = rowsState

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

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
    if (!activeContainer || !overContainer) return

    // Reorder rows
    if (activeId in rows) {
      const activeIndex = Object.keys(rows)
        .map(Number)
        .indexOf(activeContainer as number)
      const overIndex = Object.keys(rows)
        .map(Number)
        .indexOf(overContainer as number)

      updateRowContainers((state) => arrayMove(state, activeIndex, overIndex))
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

    // Create new row draggin in add row
    if (overId === NEW_ROW_ID) {
      addNewRow([activeId])
      deleteItemFromRow(activeContainer)(activeId as string)
      return
    }

    if (!overContainer) return

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
        {children}
      </SortableContext>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation} modifiers={[]}>
          {activeId ? (
            rowContainers.includes(activeId as number) ? (
              <Row
                openDialog={() => null}
                row={rows[activeId]}
                attributes={undefined}
                listeners={undefined}
                isDraggable={false}
              />
            ) : (
              <Product
                product={productUtils.getProduct(
                  activeId as string,
                  productsData
                )}
              />
            )
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
