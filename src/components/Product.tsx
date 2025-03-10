import { DeleteIcon } from '@assets/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Product as ProductType } from '@types'

interface ProductProps {
  product: ProductType
  handleDelete?: (productId: string) => void
}

export default function Product({ product, handleDelete }: ProductProps) {
  const { image, name, price } = product

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <article
      className="group relative flex shrink-0 cursor-pointer flex-col select-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div>
        <img
          src={image}
          alt={name}
          className="max-h-40 object-cover select-none md:max-h-64"
          draggable={false}
        />
        <h3>{name}</h3>
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
