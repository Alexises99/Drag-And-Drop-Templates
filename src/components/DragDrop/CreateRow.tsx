import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { NEW_ROW_ID } from '@context/TemplateContext'
import useTemplate from '@hooks/useTemplate'

export default function CreateRow() {
  const { handleAddRow } = useTemplate()
  const { setNodeRef, transform, transition, attributes, listeners, isOver } =
    useSortable({
      id: NEW_ROW_ID,
      data: {
        type: 'row'
      }
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={`border-light-gray text-dark-gray hover:border-medium-gray w-full cursor-pointer border-1 border-dashed py-4 font-semibold ${isOver ? 'bg-light-gray' : ''}`}
      {...attributes}
      {...listeners}
      onMouseDown={() => handleAddRow()}
    >
      + Anadir Fila
    </button>
  )
}
