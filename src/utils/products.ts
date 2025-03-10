import { Data } from '@dnd-kit/core'
import { Product } from '@types'

function getProduct(id: string, products: Data): Product {
  return { name: id, ...products[id] }
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
  removeProduct
}

export default productUtils
