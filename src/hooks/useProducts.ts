import { initialProducts } from '@data/products'
import { Data, Product } from '@types'
import productUtils from '@utils/products'
import { useState } from 'react'

export default function useProducts() {
  const [showProducts, setShowProducts] = useState<boolean>(false)
  const [products, setProducts] = useState<Data>(initialProducts)

  const handleShowProducts = () => setShowProducts((prev) => !prev)

  const addProduct = (product: Product) => {
    const newProducts = productUtils.addProduct(product, products)
    setProducts(newProducts)
  }

  const removeProduct = (productId: string) => {
    const newProducts = productUtils.removeProduct(productId, products)
    setProducts(newProducts)
  }

  return {
    showProducts,
    productsData: products,
    addProduct,
    removeProduct,
    handleShowProducts
  }
}
