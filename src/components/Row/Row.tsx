import TemplateButtons from './TemplateButtons'
import { SortableContext } from '@dnd-kit/sortable'
import RowContent from './RowContent'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { DraggableAttributes } from '@dnd-kit/core'
import type { Row as RowType } from '@types'
import { useTemplate } from '@hooks/useTemplate'
import Category from './Category'

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
    rows: { deleteItemFromRow, changeCategoryName, deleteRow, changeAligment }
  } = useTemplate()

  const removeItem = deleteItemFromRow(id)

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
          selectedAligment={alignment}
          listeners={listeners}
          attributes={attributes}
          changeAligment={(aligment) => changeAligment(id, aligment)}
          handleDelete={() => deleteRow(id as number)}
          openDialog={openDialog}
        />
      </header>
      {isDraggable ? (
        <SortableContext items={items} strategy={() => null}>
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
