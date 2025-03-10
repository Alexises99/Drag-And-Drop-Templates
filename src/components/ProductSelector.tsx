import { jeans } from '@data/jeans'
import Product from './Product'
import { useHorizontalDrag } from '@hooks/useHorizontalDrag'
import { useRef } from 'react'
import useTemplate from '@hooks/useTemplate'

export default function ProductSelector() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const { rows } = useTemplate()

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
      {rows[1].items.map((product) => {
        const jean = jeans.find((jean) => jean.name === product)
        return <Product product={jean!} key={jean!.name} />
      })}
    </section>
  )
}
