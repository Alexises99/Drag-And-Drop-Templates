import useTemplate from '@/hooks/useTemplate'
import CreateRow from './DragDrop/CreateRow'
import DroppableRow from './Row/DroppableRow'

export default function RowContainer() {
  const { rows, rowContainers } = useTemplate()

  return (
    <ul>
      {rowContainers.slice(1).map((rowId) => (
        <DroppableRow row={rows[rowId]} key={rowId} />
      ))}
      <CreateRow />
    </ul>
  )
}
