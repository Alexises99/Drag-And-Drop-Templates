/* eslint-disable @typescript-eslint/no-unused-vars */
import { TemplateContextValue } from '@context/Template/Template/TemplateContext'
import { initialProducts } from '@data/products'
import { UniqueIdentifier } from '@dnd-kit/core'
import type { Data, Row } from '@types'

const [firstProduct, secondProduct] = Object.keys(initialProducts)

export const mockRow: Row = {
  id: '1',
  items: [firstProduct, secondProduct],
  name: 'Test Category',
  alignment: 'center'
}

export const mockRows: Record<UniqueIdentifier, Row> = {
  1: mockRow
}

export const templateContextMock: TemplateContextValue = {
  products: {
    productsData: initialProducts as Data,
    addProduct: (_product) => {},
    removeProduct: (_productId) => {}
  },
  zoom: {
    zoom: 1,
    increaseZoom: () => {},
    decreaseZoom: () => {}
  },
  rows: {
    rows: mockRows,
    rowContainers: [mockRow.id],
    addNewRow: (_items) => {},
    addItemToRow: (_rowId, _items) => {},
    deleteRow: (_rowId) => {},
    changeCategoryName: (_rowId, _value) => {},
    handleMoveRows: (_activeId, _overId) => {},
    deleteItemFromRow: (_rowId) => (_itemId) => {},
    setRows: (_prev) => {},
    setRowContainers: (_prev) => {},
    changeAligment: (_rowId, _alignment) => {}
  },
  dragDrop: {
    handleDragEnd: (_activeId, _overId, _activeContainer, _overContainer) => {},
    handleDragOver: (
      _activeId,
      _overId,
      _activeContainer,
      _overContainer,
      _activeRect,
      _overRect
    ) => {}
  }
}
