import { useSortable } from '@dnd-kit/sortable'
import { ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'

import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { useTemplate } from '@hooks/useTemplate'

interface DroppableContainerProps {
  id: UniqueIdentifier
  items: UniqueIdentifier[]
  className?: string
  children: (
    listeners: SyntheticListenerMap | undefined,
    attributes: DraggableAttributes
  ) => ReactNode
}

export default function DroppableContainer({
  id,
  items,
  className,
  children
}: DroppableContainerProps) {
  const {
    zoom: { zoom }
  } = useTemplate()

  const {
    // over,
    // active,
    setNodeRef,
    transform,
    transition,
    listeners,
    attributes
  } = useSortable({
    id,
    data: {
      type: 'row',
      items
    }
  })

  const style = {
    transform: CSS.Translate.toString(
      transform
        ? {
            ...transform,
            scaleX: zoom,
            scaleY: zoom
          }
        : null
    ),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`h-full w-full ${className ?? ''}`}
    >
      {children(listeners, attributes)}
    </div>
  )
}
