import { PropsWithChildren } from 'react'
import { useProducts } from '@hooks/useProducts'
import useZoom from '@hooks/useZoom'
import { useRows } from '@hooks/useRows'
import { useDragDrop } from '@hooks/useDragDrop'
import { TemplateContext, TemplateContextValue } from './TemplateContext'

export default function TemplateProvider({ children }: PropsWithChildren) {
  const products = useProducts()
  const zoom = useZoom()
  const rowsState = useRows()

  const { rows, setRows } = rowsState

  const dragDrop = useDragDrop(rows, setRows)

  const value: TemplateContextValue = {
    products,
    zoom,
    rows: rowsState,
    dragDrop
  }

  return <TemplateContext value={value}>{children}</TemplateContext>
}
