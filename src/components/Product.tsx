import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Product as ProductType } from '@types'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { image, name, price } = product

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <article
      className="flex cursor-pointer flex-col select-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        src={image}
        alt={name}
        className="max-w-64 object-cover select-none"
        draggable={false}
      />
      <h3>{name}</h3>
      <span>{price}</span>
    </article>
  )
}
