import { screen } from '@testing-library/react'
import { describe, expect, vi, beforeEach } from 'vitest'
import DragDrop from '@components/DragDrop/DragDrop'
import { renderWithContext } from '../test-utils'
import { initialProducts } from '@data/products'

const [firstProduct, secondProduct] = Object.keys(initialProducts)

describe('DragDrop', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders without crashing', () => {
    renderWithContext(<DragDrop />)
    expect(screen.getByText(firstProduct)).toBeInTheDocument()
    expect(screen.getByText(secondProduct)).toBeInTheDocument()
  })
})
