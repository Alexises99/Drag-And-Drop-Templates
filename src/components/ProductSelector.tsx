import Product from './Product'
import { useRef } from 'react'
import useTemplate from '@hooks/useTemplate'
import { AddIcon } from '@assets/icons'
import { DialogMethods } from '@hooks/useDialog'
import productUtils from '@utils/products'
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable
} from '@dnd-kit/sortable'
import { PRODUCTS_ID } from '@context/TemplateContext'
import { useHorizontalDrag } from '@hooks/useHorizontalDrag'

export default function ProductSelector() {
  const { products, rows } = useTemplate()
  const divRef = useRef<HTMLDivElement>(null)

  const { scroll } = useHorizontalDrag(divRef)

  const { showProducts, productsData } = products

  const { setNodeRef } = useSortable({
    id: PRODUCTS_ID,
    data: {
      type: 'row'
    }
  })

  const dialogRef = useRef<DialogMethods>(null)

  if (!showProducts) return null

  const firstRow = rows[PRODUCTS_ID]

  return (
    <section className="border-medium-gray mt-12 flex flex-col gap-2 rounded-md border-1">
      <header className="border-medium-gray flex items-center justify-between border-b-1 p-4">
        <h2 className="text-xl font-semibold">Productos</h2>
        <button
          className="flex cursor-pointer items-center gap-2 border-1 px-4 py-2"
          onClick={() => dialogRef.current?.show()}
        >
          <AddIcon />
          Anadir Productos
        </button>
      </header>
      <div className="flex items-center justify-center gap-2 p-1 sm:p-4">
        <button
          onClick={() => scroll('left')}
          className="h-fit rounded-full bg-gray-800 px-3 py-2 text-white"
        >
          ◀
        </button>
        <div
          ref={(node) => {
            setNodeRef(node)
            divRef.current = node
          }}
          className="flex gap-2 overflow-x-auto sm:gap-4"
        >
          <SortableContext
            items={firstRow.items}
            id={PRODUCTS_ID}
            strategy={horizontalListSortingStrategy}
          >
            {firstRow.items.map((name) => {
              const product = productUtils.getProduct(
                name as string,
                productsData
              )
              return <Product product={product} key={name} />
            })}
          </SortableContext>
        </div>
        <button
          onClick={() => scroll('right')}
          className="h-fit rounded-full bg-gray-800 px-3 py-2 text-white"
        >
          ▶
        </button>
      </div>

      {/* {createPortal(<ProductDialog ref={dialogRef} />, document.body)} */}
    </section>
  )
}
