import Product from '@components/Product'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import useTemplate from '@hooks/useTemplate'
import dragDropUtils from '@utils/drag-drop'
import { PropsWithChildren, useState } from 'react'
import { createPortal } from 'react-dom'
import { NEW_ROW_ID, PRODUCTS_ID } from './TemplateContext'
import Row from '@components/Row/Row'
import productUtils from '@utils/products'

export default function DragDropContext({ children }: PropsWithChildren) {
  const {
    rows,
    rowContainers,
    handleDragEnd,
    handleDragOver,
    handleMoveRows,
    products: { productsData }
  } = useTemplate()

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const onDragStart = (event: DragStartEvent) => setActiveId(event.active.id)

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    const overId = over?.id
    const activeId = active.id
    // Active.id in rows for move containers
    if (!overId || active.id in rows) return

    const activeContainer = dragDropUtils.findContainer(rows, activeId)
    const overContainer = dragDropUtils.findContainer(rows, overId)

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

    const overContainer = dragDropUtils.findContainer(rows, overId)
    if (!overContainer) return

    handleDragEnd(activeId, overId, activeContainer, overContainer)

    // removeShowedProduct(activeId as string)

    setActiveId(null)
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
      <SortableContext
        items={[PRODUCTS_ID, ...rowContainers, NEW_ROW_ID]}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {activeId ? (
            rowContainers.includes(activeId as number) ? (
              <Row
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
