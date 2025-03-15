import Product from '@components/Product/Product'
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useTemplate } from '@hooks/useTemplate'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import Row from '@components/Row/Row'
import productUtils from '@utils/products'
import RowContainer from '@components/RowContainer'
import { NEW_ROW_ID } from '@utils/rows'
import { useDragEvents } from '@hooks/useDragEvents'

export default function DragDrop() {
  const {
    rows: rowsState,
    dragDrop,
    products: { productsData },
    zoom: { zoom }
  } = useTemplate()

  const { rowContainers, rows } = rowsState

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const { onDragEnd, onDragOver } = useDragEvents({
    rowsState,
    dragDrop,
    setActiveId
  })

  const isOrderingContainer =
    activeId != null ? rowContainers.includes(activeId) : false

  const onDragStart = (event: DragStartEvent) => setActiveId(event.active.id)

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
