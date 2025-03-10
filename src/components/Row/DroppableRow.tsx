import DroppableContainer from '@components/DragDrop/DroppableContainer'
import Row from './Row'

import type { Row as RowType } from '@types'

interface RowProps {
  row: RowType
}

export default function DroppableRow({ row }: RowProps) {
  const { id, items } = row

  return (
    <DroppableContainer id={id} items={items}>
      {(listeners, attributes) => (
        <Row
          row={row}
          isDraggable
          attributes={attributes}
          listeners={listeners}
        />
      )}
    </DroppableContainer>
  )
}
