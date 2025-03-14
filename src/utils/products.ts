import { Data } from '@dnd-kit/core'
import { Product, ProductDialog } from '@types'

export const defaultProduct: ProductDialog = {
  name: '',
  price: '',
  image: ''
}

function getProduct(id: string, products: Data): Product {
  return { name: id, ...products[id] }
}

function checkProductIsCompleted(product: ProductDialog): boolean {
  const { image, name, price } = product
  return image !== '' && name !== '' && price !== ''
}

function addProduct(product: Product, products: Data): Data {
  const copy = { ...products }
  const { name, ...rest } = product
  copy[name] = rest
  return copy
}

function removeProduct(productId: string, products: Data): Data {
  const copy = { ...products }
  delete copy[productId]
  return copy
}

const productUtils = {
  getProduct,
  addProduct,
  removeProduct,
  checkProductIsCompleted
}

export default productUtils
