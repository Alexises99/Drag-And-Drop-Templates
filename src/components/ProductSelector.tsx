import { jeans } from '@data/jeans'
import Product from './Product'
import { useHorizontalDrag } from '@hooks/useHorizontalDrag'
import { useRef } from 'react'

export default function ProductSelector() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const { handleTouchEnd, handleTouchMove, handleTouchStart } =
    useHorizontalDrag(sliderRef)

  return (
    <section
      ref={sliderRef}
      className="flex gap-4 overflow-hidden border-1 p-4 whitespace-nowrap"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {jeans.map((product) => (
        <Product product={product} key={product.name} />
      ))}
    </section>
  )
}
