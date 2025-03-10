import { useSortable } from '@dnd-kit/sortable'
import { ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'

import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

interface DroppableContainerProps {
  id: UniqueIdentifier
  items: UniqueIdentifier[]
  className?: string
  children: (
    listeners: SyntheticListenerMap | undefined,
    attributes: DraggableAttributes
  ) => ReactNode
  onRemove?: () => void
}

export default function DroppableContainer({
  id,
  items,
  children
}: DroppableContainerProps) {
  const {
    over,
    active,
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

  console.log({ over, active })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} className={`h-full w-full`}>
      {children(listeners, attributes)}
    </div>
  )
}
