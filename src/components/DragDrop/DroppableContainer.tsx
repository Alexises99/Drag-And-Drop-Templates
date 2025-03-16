import { useSortable } from '@dnd-kit/sortable'
import { ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'

import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

interface DroppableContainerProps {
  id: UniqueIdentifier
  items: UniqueIdentifier[]
  overStyles?: string
  disabled?: boolean
  children: (
    listeners: SyntheticListenerMap | undefined,
    attributes: DraggableAttributes
  ) => ReactNode
}

export default function DroppableContainer({
  id,
  items,
  disabled = false,
  overStyles,
  children
}: DroppableContainerProps) {
  const { setNodeRef, transform, transition, listeners, attributes, isOver } =
    useSortable({
      id,
      data: {
        type: 'row',
        items
      }
    })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <div
      ref={disabled ? null : setNodeRef}
      style={style}
      className={`h-fit w-full touch-none ${isOver ? (overStyles ?? '') : ''}`}
    >
      {children(listeners, attributes)}
    </div>
  )
}
