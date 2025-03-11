import { DeleteIcon } from '@assets/icons'
import { Product as ProductType } from '@types'

interface ProductProps {
  product: ProductType
  handleDelete?: (productId: string) => void
}

export default function Product({ product, handleDelete }: ProductProps) {
  const { image, name, price } = product

  return (
    <article className="group relative max-w-[120px] cursor-pointer flex-col select-none">
      <div className="flex flex-col gap-1">
        <img
          src={image}
          alt={name}
          className="max-h-40 max-w-[120px] object-cover select-none md:max-h-48"
          draggable={false}
        />
        <h3 className="text-wrap text-ellipsis">{name}</h3>
        <span>{price} EUR</span>
      </div>
      {handleDelete ? (
        <DeleteIcon
          className="top-0 right-0 hidden aspect-square h-6 w-6 bg-red-400 text-white group-hover:absolute group-hover:block"
          onMouseDown={(e) => {
            handleDelete(product.name)
            e.stopPropagation()
          }}
        />
      ) : null}
    </article>
  )
}
