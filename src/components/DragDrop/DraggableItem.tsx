import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode } from 'react'

interface DraggableItemProps {
  id: UniqueIdentifier
  children: (isActive: boolean) => ReactNode
}

export default function DraggableItem({ id, children }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children(active?.id === id)}
    </div>
  )
}
