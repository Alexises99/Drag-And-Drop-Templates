import { aligmentRecord, DragIcon, DeleteIcon, AddIcon } from '@assets/icons'

import type { DraggableAttributes } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { Alignment } from '@types'
import aligmentUtils from '@utils/aligment'

interface TemplateButtonProps
  extends Pick<TemplateButtonsProps, 'changeAligment'> {
  aligment: Alignment
  selectedAligment: Alignment
}

function TemplateButton({
  aligment,
  selectedAligment,
  changeAligment
}: TemplateButtonProps) {
  const IconComponent = aligmentRecord[aligment]
  return (
    <button
      className="text-medium-gray hover:text-dark-gray cursor-pointer"
      onClick={() => changeAligment(aligment)}
    >
      <IconComponent
        className={selectedAligment === aligment ? 'text-blue-300' : ''}
      />
    </button>
  )
}

interface TemplateButtonsProps {
  selectedAligment: Alignment
  listeners: SyntheticListenerMap | undefined
  attributes: DraggableAttributes | undefined
  changeAligment: (alignment: Alignment) => void
  handleDelete: () => void
  openDialog: () => void
}

export default function TemplateButtons({
  changeAligment,
  handleDelete,
  openDialog,
  listeners,
  attributes,
  selectedAligment
}: TemplateButtonsProps) {
  const labelAlignment = aligmentUtils.getAligmentText(selectedAligment)

  // Mostrar lista de elementos o crear desde el dialogo
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4">
        <span className="hidden sm:block">{labelAlignment}</span>
        <TemplateButton
          selectedAligment={selectedAligment}
          aligment={'left'}
          changeAligment={changeAligment}
        />
        <TemplateButton
          selectedAligment={selectedAligment}
          aligment={'center'}
          changeAligment={changeAligment}
        />
        <TemplateButton
          selectedAligment={selectedAligment}
          aligment={'right'}
          changeAligment={changeAligment}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="hidden cursor-pointer group-hover:block hover:text-red-400"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </button>
        <button
          className="flex cursor-pointer items-center gap-2 rounded-full border-1 sm:px-4 sm:py-1"
          onClick={() => openDialog()}
        >
          <AddIcon />
          <span className="hidden sm:inline">Anadir Productos</span>
        </button>
        <button className="cursor-pointer" {...listeners} {...attributes}>
          <DragIcon />
        </button>
      </div>
    </div>
  )
}
