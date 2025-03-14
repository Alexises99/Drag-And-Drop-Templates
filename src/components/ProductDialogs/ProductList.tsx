import Product from '@components/Product/Product'
import { useTemplate } from '@hooks/useTemplate'
import productUtils from '@utils/products'
import { Dispatch, FormEvent, SetStateAction } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'
import { useIntl } from 'react-intl'
import type { Data } from '@types'

const MAX_PRODUCTS = 3

interface ProductListProps {
  editedRowId: UniqueIdentifier | null
  handleClose: () => void
  setSelectedProducts: Dispatch<SetStateAction<string[]>>
  selectedProducts: string[]
}
interface ProductButtonProps {
  product: string
  isSelected: boolean
  orderNumber: number | null
  onClick: () => void
  productsData: Data
}

const ProductButton = ({
  product,
  isSelected,
  orderNumber,
  onClick,
  productsData
}: ProductButtonProps) => {
  const intl = useIntl()
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-full snap-center"
      aria-pressed={isSelected}
      aria-label={intl.formatMessage(
        {
          id: 'dialog.list.aria-product'
        },
        {
          name: product
        }
      )}
    >
      <Product
        product={productUtils.getProduct(product, productsData)}
        className={`h-full rounded-md ${isSelected ? 'text-blue-400' : ''}`}
      >
        {orderNumber !== null ? (
          <div className="bg-medium-gray absolute inset-0 flex items-center justify-center rounded-md">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400 text-3xl text-white">
              {orderNumber + 1}
            </span>
          </div>
        ) : null}
      </Product>
    </button>
  )
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

  const intl = useIntl()

  const rowProducts = Object.values(rows).flatMap((row) => row.items)
  const showedProducts = Object.keys(productsData).filter(
    (item) => !rowProducts.includes(item)
  )
  const alreadyProducts = editedRowId ? rows[editedRowId].items : []
  const remainingSlots =
    MAX_PRODUCTS - (editedRowId ? rows[editedRowId].items.length : 0)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedProducts.length) return
    if (!editedRowId) {
      addNewRow(selectedProducts)
    } else {
      addItemToRow(editedRowId, selectedProducts)
    }
    setSelectedProducts([])
    handleClose()
  }

  const handleClick = (product: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(product)) return prev.filter((item) => item !== product)
      if ([...alreadyProducts, ...prev].length >= MAX_PRODUCTS) return prev
      return [...prev, product as string]
    })
  }

  if (!showedProducts.length) {
    return (
      <div className="flex min-h-32 flex-1 items-center justify-center">
        <span>
          <FormattedMessage id="dialog.list.empty" />
        </span>
      </div>
    )
  }

  return (
    <form id="product-form" onSubmit={handleSubmit} data-testid="product-form">
      <h4 className="mb-4 text-center font-light">
        <FormattedMessage
          id="dialog.list.subtitle"
          values={{ value: remainingSlots }}
        />
      </h4>
      <section
        className="grid max-h-96 snap-y snap-proximity grid-cols-3 items-start gap-4 overflow-y-auto sm:max-h-[560px] sm:grid-cols-4"
        aria-label={intl.formatMessage({
          id: 'dialog.list.aria-grid'
        })}
      >
        {showedProducts.map((product) => {
          const isSelected = [...alreadyProducts, ...selectedProducts].includes(
            product
          )
          const orderNumber = isSelected
            ? [...alreadyProducts, ...selectedProducts].indexOf(product)
            : null

          return (
            <ProductButton
              key={product}
              product={product}
              isSelected={isSelected}
              orderNumber={orderNumber}
              onClick={() => handleClick(product)}
              productsData={productsData}
            />
          )
        })}
      </section>
    </form>
  )
}
