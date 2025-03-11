import { createContext, PropsWithChildren } from 'react'
import { useProducts } from '@hooks/useProducts'
import useZoom from '@hooks/useZoom'
import { useRows } from '@hooks/useRows'
import { useDragDrop } from '@hooks/useDragDrop'

export const NEW_ROW_ID = 'add_row'

interface TemplateContextValue {
  products: ReturnType<typeof useProducts>
  zoom: ReturnType<typeof useZoom>
  rows: ReturnType<typeof useRows>
  dragDrop: ReturnType<typeof useDragDrop>
}

export const TemplateContext = createContext<TemplateContextValue | null>(null)

export default function TemplateProvider({ children }: PropsWithChildren) {
  const products = useProducts()
  const zoom = useZoom()
  const rowsState = useRows()

  const { rows, updateRows } = rowsState

  const dragDrop = useDragDrop(rows, updateRows)

  const value: TemplateContextValue = {
    products,
    zoom,
    rows: rowsState,
    dragDrop
  }

  return <TemplateContext value={value}>{children}</TemplateContext>
}
