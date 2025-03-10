import { useState } from 'react'
import TemplateButtons from './TemplateButtons'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'
import RowContent from './RowContent'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { DraggableAttributes } from '@dnd-kit/core'
import type { Alignment, Row as RowType } from '@types'
import useTemplate from '@hooks/useTemplate'
import Category from './Category'

interface RowProps {
  row: RowType
  isDraggable: boolean
  listeners: SyntheticListenerMap | undefined
  attributes: DraggableAttributes | undefined
}

export default function Row({
  row,
  isDraggable,
  attributes,
  listeners
}: RowProps) {
  const { alignment: initialAligment, id, items, name } = row

  const [alignment, setAlignment] = useState<Alignment>(initialAligment)

  const { handleDeleteRow, changeCategoryName, removeItemFromRow } =
    useTemplate()

  const changeAligment = (alignment: Alignment) => setAlignment(alignment)

  const removeItem = removeItemFromRow(id)

  return (
    <section
      className={
        'border-medium-gray my-12 flex w-full flex-col gap-3 rounded-xl border-1'
      }
    >
      <header className="group border-medium-gray hover:bg-light-gray flex items-center justify-between border-b-1 p-4 hover:rounded-t-md">
        <Category
          id={id as number}
          name={name}
          handleChangeName={changeCategoryName}
        />
        <TemplateButtons
          selectedAligment={alignment}
          listeners={listeners}
          attributes={attributes}
          changeAligment={changeAligment}
          handleDelete={() => handleDeleteRow(id as number)}
        />
      </header>
      {isDraggable ? (
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <RowContent
            row={row}
            alignment={alignment}
            handleDelete={removeItem}
          />
        </SortableContext>
      ) : (
        <RowContent row={row} alignment={alignment} />
      )}
    </section>
  )
}
