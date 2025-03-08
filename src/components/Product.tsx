import type { Product as ProductType } from '@types'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { image, name, price } = product
  return (
    <article className="flex cursor-pointer flex-col select-none">
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
