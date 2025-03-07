import useTemplate from '@/hooks/useTemplate'
import Row from './Row/Row'

export default function RowContainer() {
  const { rows } = useTemplate()
  return (
    <ul>
      {rows.map((row) => (
        <Row row={row} key={row.id} />
      ))}
    </ul>
  )
}
