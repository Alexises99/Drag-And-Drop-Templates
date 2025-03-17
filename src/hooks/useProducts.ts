import { initialProducts } from '@data/products'
import productUtils from '@utils/products'
import { useState } from 'react'

import type { Data, Product } from '@types'

export function useProducts() {
  const [products, setProducts] = useState<Data>(initialProducts)

  const addProduct = (product: Product) => {
    const newProducts = productUtils.addProduct(product, products)
    setProducts(newProducts)
  }

  const removeProduct = (productId: string) => {
    const newProducts = productUtils.removeProduct(productId, products)
    setProducts(newProducts)
  }

  return {
    productsData: products,
    addProduct,
    removeProduct
  }
}
