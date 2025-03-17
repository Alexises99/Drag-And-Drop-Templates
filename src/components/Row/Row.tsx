import TemplateButtons from './TemplateButtons'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'
import RowContent from './RowContent'
import { useTemplate } from '@hooks/useTemplate'
import Category from './Category'

import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { DraggableAttributes } from '@dnd-kit/core'
import type { Row as RowType } from '@types'

interface RowProps {
  row: RowType
  isDraggable?: boolean
  listeners?: SyntheticListenerMap
  attributes?: DraggableAttributes
  openDialog: () => void
}

export default function Row({
  row,
  isDraggable = false,
  attributes,
  listeners,
  openDialog
}: RowProps) {
  const { alignment, id, items, name } = row

  const {
    rows: { deleteItemFromRow, changeCategoryName, deleteRow, changeAlignment },
    zoom: { zoom }
  } = useTemplate()

  const removeItem = deleteItemFromRow(id)

  const handleDelete = (itemId: string) => {
    if (items.length !== 1) {
      removeItem(itemId)
      return
    }
    removeItem(itemId)
    deleteRow(id)
  }

  return (
    <section
      className={
        'border-medium-gray flex w-full flex-col gap-3 rounded-xl border-1'
      }
    >
      <header className="group border-medium-gray hover:bg-light-gray flex justify-between border-b-1 p-4 hover:rounded-t-md sm:items-center">
        <Category
          id={id as number}
          name={name}
          handleChangeName={changeCategoryName}
        />
        <TemplateButtons
          items={items}
          selectedAlignment={alignment}
          listeners={listeners}
          attributes={attributes}
          changeAlignment={(alignment) => changeAlignment(id, alignment)}
          handleDelete={() => deleteRow(id as number)}
          openDialog={openDialog}
        />
      </header>
      {isDraggable ? (
        <SortableContext
          items={items}
          strategy={zoom === 1 ? horizontalListSortingStrategy : () => null}
        >
          <RowContent
            row={row}
            alignment={alignment}
            handleDelete={handleDelete}
          />
        </SortableContext>
      ) : (
        <RowContent row={row} alignment={alignment} />
      )}
    </section>
  )
}
