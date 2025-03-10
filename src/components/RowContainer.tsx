import useTemplate from '@/hooks/useTemplate'
import Row from './Row/Row'
import CreateRow from './DragDrop/CreateRow'

export default function RowContainer() {
  const { rows, rowContainers } = useTemplate()

  return (
    <ul>
      {rowContainers.map((rowId) => (
        <Row row={rows[rowId]} key={rows[rowId].id} />
      ))}
      <CreateRow />
    </ul>
  )
}
