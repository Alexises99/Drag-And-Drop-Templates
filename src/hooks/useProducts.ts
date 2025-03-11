import { initialProducts } from '@data/products'
import { Data, Product } from '@types'
import productUtils from '@utils/products'
import { useState } from 'react'

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
