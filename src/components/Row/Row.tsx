import type { Alignment, Row as RowType } from '@types'
import { PropsWithChildren, useState } from 'react'

import TemplateButtons from './TemplateButtons'
import aligmentUtils from '@utils/aligment'

interface RowProps {
  row: RowType
}

export default function Row({ row, children }: PropsWithChildren<RowProps>) {
  const { alignment: initialAligment } = row

  const [showButtons, setShowButtons] = useState(false)
  const [alignment, setAlignment] = useState<Alignment>(initialAligment)

  const selectedAligment = aligmentUtils.getJustifyAligment(alignment)

  const changeAligment = (alignment: Alignment) => setAlignment(alignment)

  return (
    <li
      className="relative my-12 flex h-full w-full items-center border-1 p-4 hover:bg-gray-100"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {showButtons ? <TemplateButtons changeAligment={changeAligment} /> : null}
      <div className={`flex w-full items-center gap-4 ${selectedAligment}`}>
        {children}
      </div>
    </li>
  )
}
