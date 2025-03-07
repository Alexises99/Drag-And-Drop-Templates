import useTemplate from '@/hooks/useTemplate'
import Row from './Row'

export default function RowContainer() {
  const { rows } = useTemplate()
  return (
    <ul>
      {rows.map((row) => (
        <li key={row.id}>
          <Row />
        </li>
      ))}
    </ul>
  )
}
