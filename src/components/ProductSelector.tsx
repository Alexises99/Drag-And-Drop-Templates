import { jeans } from '@data/jeans'
import Product from './Product'
import { useHorizontalDrag } from '@hooks/useHorizontalDrag'
import { useRef } from 'react'
import useTemplate from '@hooks/useTemplate'

export default function ProductSelector() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const { rows, showProducts } = useTemplate()

  const firstRow = rows[1]

  const { handleTouchEnd, handleTouchMove, handleTouchStart } =
    useHorizontalDrag(sliderRef)

  if (!showProducts) return null

  return (
    <>
      <h3>Productos</h3>
      <section
        ref={sliderRef}
        className="flex gap-4 overflow-hidden overflow-x-auto border-1 p-4 whitespace-nowrap"
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {firstRow.items.map((product) => {
          const jean = jeans.find((jean) => jean.name === product)
          return <Product product={jean!} key={jean!.name} />
        })}
      </section>
    </>
  )
}
