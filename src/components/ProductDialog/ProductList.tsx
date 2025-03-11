import Product from '@components/Product/Product'
import useTemplate from '@hooks/useTemplate'
import productUtils from '@utils/products'
import { FormEvent, useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'

interface ProductListProps {
  editedRowId: UniqueIdentifier | null
}

export default function ProductList({ editedRowId }: ProductListProps) {
  const {
    products: { productsData },
    rows,
    handleAddRow,
    handleEditRow
  } = useTemplate()

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const rowProducts = Object.values(rows)
    .map((row) => row.items)
    .flat()

  const showedProducts = Object.keys(productsData).filter(
    (item) => !rowProducts.includes(item)
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedProduct) return
    if (!editedRowId) handleAddRow([selectedProduct])
    else handleEditRow(editedRowId, selectedProduct)
    setSelectedProduct(null)
  }

  return (
    <form id="product-form" onSubmit={handleSubmit}>
      <section className="grid max-h-full snap-y snap-proximity grid-cols-3 items-start gap-4 overflow-y-auto sm:grid-cols-4">
        {showedProducts.map((product) => (
          <button
            type="button"
            key={product}
            onClick={() => setSelectedProduct(product as string)}
            className={`${product === selectedProduct ? 'bg-medium-gray' : ''} snap-center`}
          >
            <Product
              product={productUtils.getProduct(product as string, productsData)}
            />
          </button>
        ))}
      </section>
    </form>
  )
}
