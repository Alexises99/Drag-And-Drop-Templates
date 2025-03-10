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
      className="flex shrink-0 cursor-pointer flex-col select-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        src={image}
        alt={name}
        className="max-h-40 object-cover select-none md:max-h-80"
        draggable={false}
      />
      <h3>{name}</h3>
      <span>{price}</span>
    </article>
  )
}
