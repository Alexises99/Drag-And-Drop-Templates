import type { Alignment, Row as RowType } from '@types'
import { useState } from 'react'
import Product from '../Product'
import TemplateButtons from './TemplateButtons'
import aligmentUtils from '@utils/aligment'

interface RowProps {
  row: RowType
}

export default function Row({ row }: RowProps) {
  const { alignment: initialAligment } = row

  const [showButtons, setShowButtons] = useState(false)
  const [alignment, setAlignment] = useState<Alignment>(initialAligment)

  const selectedAligment = aligmentUtils.getJustifyAligment(alignment)

  const changeAligment = (alignment: Alignment) => setAlignment(alignment)

  return (
    <li
      className="relative my-8 flex h-full min-h-36 w-full items-center border-1 p-4 hover:bg-gray-100"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {showButtons ? <TemplateButtons changeAligment={changeAligment} /> : null}
      <div
        className={`flex w-full items-center justify-between gap-4 ${selectedAligment}`}
      >
        <span>
          <Product />
        </span>
        <span>
          <Product />
        </span>
        <span>
          <Product />
        </span>
      </div>
    </li>
  )
}
