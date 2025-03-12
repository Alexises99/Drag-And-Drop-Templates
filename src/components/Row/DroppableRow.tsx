import DroppableContainer from '@components/DragDrop/DroppableContainer'
import Row from './Row'

import type { Row as RowType } from '@types'

interface RowProps {
  row: RowType
  openDialog: () => void
}

export default function DroppableRow({ row, openDialog }: RowProps) {
  const { id, items } = row

  return (
    <DroppableContainer
      id={id}
      items={items}
      overStyles="bg-light-gray rounded-xl"
    >
      {(listeners, attributes) => (
        <Row
          openDialog={openDialog}
          row={row}
          isDraggable
          attributes={attributes}
          listeners={listeners}
        />
      )}
    </DroppableContainer>
  )
}
