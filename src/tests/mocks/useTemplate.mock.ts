/* eslint-disable @typescript-eslint/no-unused-vars */
import { TemplateContextValue } from '@context/TemplateContext'
import { initialProducts } from '@data/products'
import { UniqueIdentifier, ClientRect } from '@dnd-kit/core'
import type { Alignment, Data, Product, Row } from '@types'

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
    addProduct: (_product: Product) => {},
    removeProduct: (_productId: string) => {}
  },
  zoom: {
    zoom: 1,
    increaseZoom: () => {},
    decreaseZoom: () => {}
  },
  rows: {
    rows: mockRows,
    rowContainers: ['1'],
    addNewRow: (_items?: UniqueIdentifier[]) => {},
    addItemToRow: (_rowId: UniqueIdentifier, _items: UniqueIdentifier[]) => {},
    deleteRow: (_rowId: UniqueIdentifier) => {},
    changeCategoryName: (_rowId: UniqueIdentifier, _value: string) => {},
    handleMoveRows: (_activeId: number, _overId: number) => {},
    deleteItemFromRow: (_rowId: UniqueIdentifier) => (_itemId: string) => {},
    updateRows: (
      _updater: (
        prev: Record<UniqueIdentifier, Row>
      ) => Record<UniqueIdentifier, Row>
    ) => {},
    updateRowContainers: (
      _updater: (prev: UniqueIdentifier[]) => UniqueIdentifier[]
    ) => {},
    changeAligment: (_rowId: UniqueIdentifier, _alignment: Alignment) => {}
  },
  dragDrop: {
    handleDragEnd: (
      _activeId: UniqueIdentifier,
      _overId: UniqueIdentifier,
      _activeContainer: UniqueIdentifier,
      _overContainer: UniqueIdentifier
    ) => {},
    handleDragOver: (
      _activeId: UniqueIdentifier,
      _overId: UniqueIdentifier,
      _activeContainer: UniqueIdentifier,
      _overContainer: UniqueIdentifier,
      _activeRect: ClientRect | null,
      _overRect: ClientRect
    ) => {}
  }
}
