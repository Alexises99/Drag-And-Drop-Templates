import Product from '@components/Product/Product'
import { useTemplate } from '@hooks/useTemplate'
import productUtils from '@utils/products'
import { Dispatch, FormEvent, SetStateAction } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'

interface ProductListProps {
  editedRowId: UniqueIdentifier | null
  handleClose: () => void
  setSelectedProducts: Dispatch<SetStateAction<string[]>>
  selectedProducts: string[]
}

export default function ProductList({
  editedRowId,
  selectedProducts,
  setSelectedProducts,
  handleClose
}: ProductListProps) {
  const {
    products: { productsData },
    rows: { addNewRow, addItemToRow, rows }
  } = useTemplate()

  const rowProducts = Object.values(rows)
    .map((row) => row.items)
    .flat()

  const showedProducts = Object.keys(productsData).filter(
    (item) => !rowProducts.includes(item)
  )

  const alreadyProducts = editedRowId ? rows[editedRowId].items : []

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedProducts.length) return
    if (!editedRowId) addNewRow(selectedProducts)
    else addItemToRow(editedRowId, selectedProducts)
    setSelectedProducts([])
    handleClose()
  }

  const handleClick = (product: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(product)) return prev.filter((item) => item !== product)
      if ([...alreadyProducts, ...prev].length === 3) return prev
      return [...prev, product as string]
    })
  }

  if (!showedProducts.length) {
    return (
      <div className="flex min-h-32 flex-1 items-center justify-center">
        <span>No hay productos disponibles.</span>
      </div>
    )
  }

  return (
    <form id="product-form" onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center font-light">
        {editedRowId
          ? `Maximo ${3 - rows[editedRowId].items.length} productos`
          : 'Maximo 3 productos'}
      </h4>
      <section className="grid max-h-full snap-y snap-proximity grid-cols-3 items-start gap-4 overflow-y-auto sm:grid-cols-4">
        {showedProducts.map((product) => (
          <button
            type="button"
            key={product}
            onClick={() => handleClick(product)}
            className={`h-full snap-center`}
          >
            <Product
              product={productUtils.getProduct(product as string, productsData)}
              className={`h-full rounded-md ${selectedProducts.includes(product) ? 'text-blue-400' : ''}`}
            >
              {[...alreadyProducts, ...selectedProducts].includes(product) ? (
                <div className="bg-medium-gray absolute inset-0 flex items-center justify-center rounded-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400 text-3xl text-white">
                    {selectedProducts.indexOf(product) + 1}
                  </span>
                </div>
              ) : null}
            </Product>
          </button>
        ))}
      </section>
    </form>
  )
}
