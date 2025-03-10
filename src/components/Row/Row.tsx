import type { Alignment, Row as RowType } from '@types'
import { useState } from 'react'
import TemplateButtons from './TemplateButtons'
import aligmentUtils from '@utils/aligment'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'
import DroppableRow from '@components/DragDrop/DroppableRow'
import { jeans } from '@data/jeans'
import Product from '@components/Product'

interface RowProps {
  row: RowType
}

export default function Row({ row }: RowProps) {
  const { alignment: initialAligment, id } = row

  const [alignment, setAlignment] = useState<Alignment>(initialAligment)

  const selectedAligment = aligmentUtils.getJustifyAligment(alignment)

  const changeAligment = (alignment: Alignment) => setAlignment(alignment)

  return (
    <DroppableRow
      id={id}
      items={row.items}
      className="border-medium-gray my-12 flex w-full flex-col gap-3 border-1 p-4"
      header={(listeners, attributes) => (
        <header className="flex items-center justify-between">
          <span>{`Categoria ${id}`}</span>
          <TemplateButtons
            listeners={listeners}
            attributes={attributes}
            changeAligment={changeAligment}
          />
        </header>
      )}
    >
      <div
        className={`flex min-h-44 w-full items-center gap-4 ${selectedAligment}`}
      >
        <SortableContext
          items={row.items}
          strategy={horizontalListSortingStrategy}
        >
          {row.items.map((item) => {
            const jean = jeans.find((jean) => jean.name === item)
            return <Product product={jean!} key={jean?.name} />
          })}
        </SortableContext>
      </div>
    </DroppableRow>
  )
}
