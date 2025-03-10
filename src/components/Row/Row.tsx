import type { Alignment, Row as RowType } from '@types'
import { PropsWithChildren, useState } from 'react'

import TemplateButtons from './TemplateButtons'
import aligmentUtils from '@utils/aligment'
import { useDroppable } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'

interface RowProps {
  row: RowType
}

export default function Row({ row, children }: PropsWithChildren<RowProps>) {
  const { alignment: initialAligment, id } = row

  const [showButtons, setShowButtons] = useState(false)
  const [alignment, setAlignment] = useState<Alignment>(initialAligment)

  const { setNodeRef } = useDroppable({ id })

  const selectedAligment = aligmentUtils.getJustifyAligment(alignment)

  const changeAligment = (alignment: Alignment) => setAlignment(alignment)

  return (
    <li
      ref={setNodeRef}
      className="relative my-12 flex h-full min-h-96 w-full items-center border-1 p-4 hover:bg-gray-100"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {showButtons ? <TemplateButtons changeAligment={changeAligment} /> : null}
      <div className={`flex w-full items-center gap-4 ${selectedAligment}`}>
        <SortableContext
          items={row.items}
          strategy={horizontalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </div>
    </li>
  )
}
