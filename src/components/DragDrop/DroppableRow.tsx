import { useSortable } from '@dnd-kit/sortable'
import { PropsWithChildren, ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'

import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

interface DroppableRowProps {
  id: UniqueIdentifier
  items: UniqueIdentifier[]
  className?: string
  header: (
    listeners: SyntheticListenerMap | undefined,
    attributes: DraggableAttributes
  ) => ReactNode
  onRemove?: () => void
}

export default function DroppableRow({
  id,
  items,
  className,
  children,
  header,
  onRemove
}: PropsWithChildren<DroppableRowProps>) {
  const {
    over,
    active,
    isOver,
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

  const isOverRow = over
    ? (id === over.id && active?.data.current?.type !== 'row') ||
      items.includes(over.id)
    : false

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <section ref={setNodeRef} style={style} className={className}>
      {header(listeners, attributes)}
      {children}
    </section>
  )
}
