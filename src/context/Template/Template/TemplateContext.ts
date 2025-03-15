import { useDragDrop } from '@hooks/useDragDrop'
import { useProducts } from '@hooks/useProducts'
import { useRows } from '@hooks/useRows'
import useZoom from '@hooks/useZoom'
import { createContext } from 'react'

export interface TemplateContextValue {
  products: ReturnType<typeof useProducts>
  zoom: ReturnType<typeof useZoom>
  rows: ReturnType<typeof useRows>
  dragDrop: ReturnType<typeof useDragDrop>
}

export const TemplateContext = createContext<TemplateContextValue | null>(null)
