import type { Alignment, Row } from '@types'
import aligmentUtils from '@utils/aligment'
import Product from '@components/Product'
import productUtils from '@utils/products'
import useTemplate from '@hooks/useTemplate'

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
  const {
    products: { productsData }
  } = useTemplate()

  const { items } = row
  const selectedAligment = aligmentUtils.getJustifyAligment(alignment)
  return (
    <div className={`flex min-h-44 w-full gap-4 p-4 ${selectedAligment}`}>
      {items.map((item) => {
        const product = productUtils.getProduct(item as string, productsData)
        return (
          <Product product={product} key={item} handleDelete={handleDelete} />
        )
      })}
    </div>
  )
}
