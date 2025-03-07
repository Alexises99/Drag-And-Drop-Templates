export type Alignment = 'left' | 'center' | 'right'

export interface Row {
  id: number
  alignment: Alignment
}

export interface Product {
  name: string
  price: number
  image: string
}
