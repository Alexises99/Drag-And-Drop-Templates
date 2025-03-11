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
import { PropsWithChildren, useState } from 'react'
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

  const onDragStart = (event: DragStartEvent) => setActiveId(event.active.id)

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    const overId = over?.id
    const activeId = active.id
    // Active.id in rows for move containers
    if (!overId) return

    if (active.id in rows) {
      const activeContainer = dragDropUtils.findContainer(rows, activeId)
      const overContainer = dragDropUtils.findContainer(rows, overId)
      if (!activeContainer || !overContainer) return

      const a = Object.keys(rows)
        .map(Number)
        .indexOf(activeContainer as number)
      const b = Object.keys(rows)
        .map(Number)
        .indexOf(overContainer as number)

      updateRowContainers((prev) => arrayMove(prev, a, b))
      return
    }

    const activeContainer = dragDropUtils.findContainer(rows, activeId)
    const overContainer = dragDropUtils.findContainer(rows, overId)

    console.log({ activeContainer, overContainer, activeId, overId })

    if (!activeContainer || !overContainer) return

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
      handleDragEnd(activeId, overId, activeContainer, overContainer)
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    const overId = over?.id
    const activeId = active.id

    if (rowContainers.includes(activeId as number) && overId) {
      handleMoveRows(activeId as number, overId as number)
      return
    }

    const activeContainer = dragDropUtils.findContainer(rows, activeId)

    if (!activeContainer || !overId) {
      setActiveId(null)
      return
    }

    if (overId === NEW_ROW_ID) {
      addNewRow([activeId])
      deleteItemFromRow(activeContainer)(activeId as string)
      return
    }

    const overContainer = dragDropUtils.findContainer(rows, overId)
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
