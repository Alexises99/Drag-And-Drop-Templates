import useTemplate from '@/hooks/useTemplate'
import Row from './Row/Row'
import Product from './Product'
import { jeans } from '@data/jeans'

export default function RowContainer() {
  const { rows } = useTemplate()
  return (
    <ul>
      {Object.values(rows)
        .slice(1)
        .map((row) => (
          <Row row={row} key={row.id}>
            {row.items.map((item) => {
              const jean = jeans.find((jean) => jean.name === item)
              return <Product product={jean!} key={jean?.name} />
            })}
          </Row>
        ))}
    </ul>
  )
}
