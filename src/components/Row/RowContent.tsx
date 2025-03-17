import alignmentUtils from '@utils/alignment'
import Product from '@components/Product/Product'
import productUtils from '@utils/products'
import { useTemplate } from '@hooks/useTemplate'
import DraggableItem from '@components/DragDrop/DraggableItem'

import type { Alignment, Row } from '@types'

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
  const selectedAlignment = alignmentUtils.getJustifyAlignment(alignment)
  return (
    <div
      className={`flex min-h-60 w-full gap-4 p-2 sm:p-4 ${selectedAlignment}`}
    >
      {items.map((item) => {
        const product = productUtils.getProduct(item as string, productsData)
        return (
          <DraggableItem id={product.name} key={item}>
            {(isActive) => (
              <Product
                product={product}
                handleDelete={handleDelete}
                isActive={isActive}
              />
            )}
          </DraggableItem>
        )
      })}
    </div>
  )
}
