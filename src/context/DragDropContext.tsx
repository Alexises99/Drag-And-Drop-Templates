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
import useTemplate from '@hooks/useTemplate'
import dragDropUtils from '@utils/drag-drop'
import { PropsWithChildren, useState } from 'react'
import { createPortal } from 'react-dom'

export default function DragDropContext({ children }: PropsWithChildren) {
  const { rows, handleDragEnd, handleDragOver } = useTemplate()
  const rowsContainers = Object.keys(rows)
    .slice(1)
    .map((item) => Number(item))

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
      {children}
      {createPortal(
        <DragOverlay>
          {activeId ? (
            rowsContainers.includes(activeId as number) ? (
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
