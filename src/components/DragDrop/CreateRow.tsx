import { NEW_ROW_ID } from '@context/TemplateContext'
import DroppableContainer from './DroppableContainer'

interface CreateRowProps {
  openCreateDialog: () => void
}

export default function CreateRow({ openCreateDialog }: CreateRowProps) {
  return (
    <DroppableContainer id={NEW_ROW_ID} items={[]} overStyles="bg-light-gray">
      {(_listeners, attributes) => (
        <button
          className={`border-light-gray text-dark-gray hover:border-medium-gray w-full cursor-pointer border-1 border-dashed py-4 font-semibold`}
          // {...listeners}
          {...attributes}
          onMouseDown={() => openCreateDialog()}
        >
          + Añadir Fila
        </button>
      )}
    </DroppableContainer>
  )
}
