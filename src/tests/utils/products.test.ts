import { describe, test, expect } from 'vitest'
import productUtils from '@utils/products'
import type { Product } from '@types'

describe('productUtils', () => {
  const mockProducts = {
    'product-1': {
      price: 99.99,
      image: 'image1.jpg'
    },
    'product-2': {
      price: 149.99,
      image: 'image2.jpg'
    }
  }

  describe('getProduct', () => {
    test('returns product with correct structure', () => {
      const product = productUtils.getProduct('product-1', mockProducts)
      expect(product).toEqual({
        name: 'product-1',
        price: 99.99,
        image: 'image1.jpg'
      })
    })

    test('handles non-existent product', () => {
      const product = productUtils.getProduct('non-existent', mockProducts)
      expect(product).toEqual({
        name: 'non-existent',
        price: undefined,
        image: undefined
      })
    })
  })

  describe('addProduct', () => {
    test('adds new product to products list', () => {
      const newProduct: Product = {
        name: 'product-3',
        price: 199.99,
        image: 'image3.jpg'
      }

      const updatedProducts = productUtils.addProduct(newProduct, mockProducts)

      expect(updatedProducts['product-3']).toEqual({
        price: 199.99,
        image: 'image3.jpg'
      })
      expect(Object.keys(updatedProducts).length).toBe(3)
    })

    test('updates existing product', () => {
      const updatedProduct: Product = {
        name: 'product-1',
        price: 79.99,
        image: 'new-image1.jpg'
      }

      const updatedProducts = productUtils.addProduct(
        updatedProduct,
        mockProducts
      )

      expect(updatedProducts['product-1']).toEqual({
        price: 79.99,
        image: 'new-image1.jpg'
      })
      expect(Object.keys(updatedProducts).length).toBe(2)
    })
  })

  describe('removeProduct', () => {
    test('removes existing product', () => {
      const updatedProducts = productUtils.removeProduct(
        'product-1',
        mockProducts
      )

      expect(updatedProducts['product-1']).toBeUndefined()
      expect(Object.keys(updatedProducts).length).toBe(1)
    })

    test('returns same state when removing non-existent product', () => {
      const updatedProducts = productUtils.removeProduct(
        'non-existent',
        mockProducts
      )

      expect(updatedProducts).toEqual(mockProducts)
      expect(Object.keys(updatedProducts).length).toBe(2)
    })
  })
})
