import useTemplate from '@/hooks/useTemplate'
import Row from './Row/Row'
import CreateRow from './DragDrop/CreateRow'

export default function RowContainer() {
  const { rows } = useTemplate()

  return (
    <ul>
      {Object.values(rows)
        .slice(1)
        .map((row) => (
          <Row row={row} key={row.id} />
        ))}
      <CreateRow />
    </ul>
  )
}
