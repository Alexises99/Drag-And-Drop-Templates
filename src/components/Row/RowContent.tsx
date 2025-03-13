import type { Alignment, Row } from '@types'
import aligmentUtils from '@utils/aligment'
import Product from '@components/Product/Product'
import productUtils from '@utils/products'
import { useTemplate } from '@hooks/useTemplate'
import DraggableItem from '@components/DragDrop/DraggableItem'

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
    <div
      className={`flex min-h-44 w-full gap-4 p-2 sm:p-4 ${selectedAligment}`}
    >
      {items.map((item) => {
        const product = productUtils.getProduct(item as string, productsData)
        return (
          <DraggableItem id={product.name} key={item}>
            <Product product={product} handleDelete={handleDelete} />
          </DraggableItem>
        )
      })}
    </div>
  )
}
