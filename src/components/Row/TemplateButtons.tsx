import { aligmentRecord } from '@assets/icons'
import { Alignment } from '@types'

interface TemplateButtonProps extends TemplateButtonsProps {
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
}

export default function TemplateButtons({
  changeAligment
}: TemplateButtonsProps) {
  return (
    <div className="absolute right-0 bottom-[100%] flex items-center gap-4">
      <TemplateButton aligment={'left'} changeAligment={changeAligment} />
      <TemplateButton aligment={'center'} changeAligment={changeAligment} />
      <TemplateButton aligment={'right'} changeAligment={changeAligment} />
    </div>
  )
}
