import { Alignment, Row } from '@types'

import { jeans } from '@data/jeans'
import aligmentUtils from '@utils/aligment'
import Product from '@components/Product'

interface RowContentProps {
  row: Row
  alignment: Alignment
  handleDelete?: (productId: string) => void
}

export default function RowContent({
  row,
  alignment,
  handleDelete
}: RowContentProps) {
  const { items } = row
  const selectedAligment = aligmentUtils.getJustifyAligment(alignment)
  return (
    <div
      className={`flex min-h-44 w-full items-center gap-4 p-4 ${selectedAligment}`}
    >
      {items.map((item) => {
        const jean = jeans.find((jean) => jean.name === item)
        return (
          <Product
            product={jean!}
            key={jean?.name}
            handleDelete={handleDelete}
          />
        )
      })}
    </div>
  )
}
