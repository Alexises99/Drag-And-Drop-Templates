import Product from '@components/Product'
import RowOverlay from '@components/Row/RowOverlay'
import { jeans } from '@data/jeans'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import useTemplate from '@hooks/useTemplate'
import dragDropUtils from '@utils/drag-drop'
import { PropsWithChildren, useState } from 'react'
import { createPortal } from 'react-dom'
import { NEW_ROW_ID } from './TemplateContext'

export default function DragDropContext({ children }: PropsWithChildren) {
  const { rows, rowContainers, handleDragEnd, handleDragOver, handleMoveRows } =
    useTemplate()

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(useSensor(MouseSensor))

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
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={[...rowContainers, NEW_ROW_ID]}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {activeId ? (
            rowContainers.includes(activeId as number) ? (
              <RowOverlay row={rows[activeId]} />
            ) : (
              <Product
                product={jeans.find((jean) => jean.name === activeId)!}
              />
            )
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
