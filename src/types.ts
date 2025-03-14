import { UniqueIdentifier } from '@dnd-kit/core'

export type Alignment = 'left' | 'center' | 'right'

export interface Row {
  id: UniqueIdentifier
  name: string
  alignment: Alignment
  items: UniqueIdentifier[]
}

export interface Product {
  name: string
  price: number
  image: string
}

export interface ProductDialog extends Pick<Product, 'name' | 'image'> {
  price: string
}

export type DragItem = Pick<Row, 'id' | 'items'>

export type Data = Record<string, Omit<Product, 'name'>>
