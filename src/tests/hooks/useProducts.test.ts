import { renderHook, act } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { useProducts } from '@hooks/useProducts'

// Mock the initial products data
vi.mock('@data/products', () => ({
  initialProducts: {
    'product-1': {
      price: 99.99,
      image: 'test1.jpg'
    },
    'product-2': {
      price: 149.99,
      image: 'test2.jpg'
    }
  }
}))

describe('useProducts', () => {
  test('initializes with initial products', () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current.productsData).toEqual({
      'product-1': { price: 99.99, image: 'test1.jpg' },
      'product-2': { price: 149.99, image: 'test2.jpg' }
    })
  })

  describe('addProduct', () => {
    test('adds a new product correctly', () => {
      const { result } = renderHook(() => useProducts())

      const newProduct = {
        name: 'product-3',
        price: 199.99,
        image: 'test3.jpg'
      }

      act(() => {
        result.current.addProduct(newProduct)
      })

      expect(result.current.productsData['product-3']).toEqual({
        price: 199.99,
        image: 'test3.jpg'
      })
    })

    test('updates existing product', () => {
      const { result } = renderHook(() => useProducts())

      const updatedProduct = {
        name: 'product-1',
        price: 79.99,
        image: 'updated1.jpg'
      }

      act(() => {
        result.current.addProduct(updatedProduct)
      })

      expect(result.current.productsData['product-1']).toEqual({
        price: 79.99,
        image: 'updated1.jpg'
      })
    })
  })

  describe('removeProduct', () => {
    test('removes an existing product', () => {
      const { result } = renderHook(() => useProducts())

      act(() => {
        result.current.removeProduct('product-1')
      })

      expect(result.current.productsData['product-1']).toBeUndefined()
      expect(Object.keys(result.current.productsData)).not.toContain(
        'product-1'
      )
    })

    test('handles removing non-existent product', () => {
      const { result } = renderHook(() => useProducts())
      const initialState = { ...result.current.productsData }

      act(() => {
        result.current.removeProduct('non-existent')
      })

      expect(result.current.productsData).toEqual(initialState)
    })
  })
})
