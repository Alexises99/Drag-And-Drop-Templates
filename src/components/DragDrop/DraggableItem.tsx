import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTemplate } from '@hooks/useTemplate'
import { PropsWithChildren } from 'react'

interface DraggableItemProps {
  id: UniqueIdentifier
}

export default function DraggableItem({
  id,
  children
}: PropsWithChildren<DraggableItemProps>) {
  const {
    zoom: { zoom }
  } = useTemplate()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
