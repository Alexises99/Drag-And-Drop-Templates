import { DeleteIcon } from '@assets/icons'
import { Product as ProductType } from '@types'
import { ReactNode } from 'react'
import { FormattedNumber } from 'react-intl'

interface ProductProps {
  product: ProductType
  handleDelete?: (productId: string) => void
  children?: ReactNode
  className?: string
}

export default function Product({
  product,
  children,
  className,
  handleDelete
}: ProductProps) {
  const { image, name, price } = product

  return (
    <article
      className={`group relative max-w-24 cursor-pointer select-none sm:max-w-32 ${className ?? ''}`}
    >
      <div className="flex flex-col gap-1">
        <img
          src={image}
          alt={name}
          className="max-h-40 max-w-24 object-cover select-none sm:max-w-32 md:max-h-48"
          draggable={false}
        />
        <h3 className="text-wrap text-ellipsis">{name}</h3>
        <span>
          <FormattedNumber value={price} style="currency" currency="EUR" />{' '}
        </span>
      </div>
      {handleDelete ? (
        <button
          className="top-0 right-0 hidden aspect-square h-6 w-6 cursor-pointer bg-red-400 text-white group-hover:absolute group-hover:block"
          data-testid="delete-product"
          onMouseDown={(e) => {
            handleDelete(product.name)
            e.stopPropagation()
          }}
        >
          <DeleteIcon />
        </button>
      ) : null}
      {children}
    </article>
  )
}
