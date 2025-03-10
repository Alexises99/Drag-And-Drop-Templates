import { aligmentRecord } from '@assets/icons'

import type { DraggableAttributes } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { Alignment } from '@types'

interface TemplateButtonProps
  extends Pick<TemplateButtonsProps, 'changeAligment'> {
  aligment: Alignment
}

function TemplateButton({ aligment, changeAligment }: TemplateButtonProps) {
  return (
    <button
      className="border-1 bg-white px-4 py-2"
      onClick={() => changeAligment(aligment)}
    >
      <img src={aligmentRecord[aligment]} alt={`${aligment} aligment icon`} />
    </button>
  )
}

interface TemplateButtonsProps {
  changeAligment: (alignment: Alignment) => void
  listeners: SyntheticListenerMap | undefined
  attributes: DraggableAttributes | undefined
}

export default function TemplateButtons({
  changeAligment,
  listeners,
  attributes
}: TemplateButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <TemplateButton aligment={'left'} changeAligment={changeAligment} />
      <TemplateButton aligment={'center'} changeAligment={changeAligment} />
      <TemplateButton aligment={'right'} changeAligment={changeAligment} />
      <button {...listeners} {...attributes}>
        Move
      </button>
    </div>
  )
}
