import { DeleteIcon } from '@assets/icons'

import { Product as ProductType } from '@types'
import { ReactNode } from 'react'
import { FormattedNumber, useIntl } from 'react-intl'

interface ProductProps {
  product: ProductType
  handleDelete?: (productId: string) => void
  children?: ReactNode
  isActive?: boolean
  className?: string
}

export default function Product({
  product,
  children,
  className,
  isActive,
  handleDelete
}: ProductProps) {
  const { image, name, price } = product

  const intl = useIntl()

  const formattedPrice = intl.formatNumber(price, {
    style: 'currency',
    currency: 'EUR'
  })

  return (
    <article
      className={`group relative max-w-24 cursor-pointer select-none sm:max-w-32 ${className ?? ''}`}
      role="group"
      aria-label={intl.formatMessage(
        { id: 'product.aria-label' },
        { name, price: formattedPrice }
      )}
    >
      <div className={`flex flex-col gap-1 ${isActive ? 'opacity-30' : ''}`}>
        <img
          src={image}
          alt={intl.formatMessage(
            {
              id: 'product.image-alt'
            },
            {
              name
            }
          )}
          className="h-40 max-w-24 object-contain select-none sm:max-w-32 md:h-48"
          draggable={false}
          loading="lazy"
        />
        <h3 className="line-clamp-2" aria-label={name} title={name}>
          {name}
        </h3>
        <span>
          <FormattedNumber value={price} style="currency" currency="EUR" />
        </span>
      </div>
      {handleDelete ? (
        <button
          className="top-0 right-0 hidden aspect-square h-6 w-6 cursor-pointer bg-red-400 text-white group-hover:absolute group-hover:block"
          data-testid="delete-product"
          aria-label={intl.formatMessage(
            {
              id: 'product.delete.label'
            },
            {
              name
            }
          )}
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
