import { describe, test, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import ProductList from '@components/ProductDialogs/ProductList'
import { renderWithContext } from '../test-utils'
import { initialProducts } from '@data/products'
import { mockRow, templateContextMock } from '../mocks/useTemplate.mock'
import { MAX_PRODUCTS } from '@utils/products'

describe('ProductList', () => {
  const mockProps = {
    editedRowId: null,
    handleClose: vi.fn(),
    setSelectedProducts: vi.fn(),
    selectedProducts: []
  }

  const [firstProduct, secondProduct, thridProduct, fourthProduct] =
    Object.keys(initialProducts)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders products correctly', () => {
    renderWithContext(<ProductList {...mockProps} />)

    expect(screen.queryByText(firstProduct)).not.toBeInTheDocument()
    expect(screen.queryByText(secondProduct)).not.toBeInTheDocument()
    expect(screen.getByText(thridProduct)).toBeInTheDocument()
    expect(screen.getByText(fourthProduct)).toBeInTheDocument()
  })

  test('selects and deselects products on click', () => {
    renderWithContext(<ProductList {...mockProps} />)

    const productButton = screen.getByText(thridProduct).closest('button')
    fireEvent.click(productButton!)

    expect(mockProps.setSelectedProducts).toHaveBeenCalled()
  })

  test('shows correct maximum products message when editing row', () => {
    const propsWithEditedRow = {
      ...mockProps,
      editedRowId: mockRow.id
    }

    renderWithContext(<ProductList {...propsWithEditedRow} />)
    const maxProductsMessage = screen.getByText(/Máximo \d+ productos/i)
    const numberMatch = maxProductsMessage.textContent?.match(/\d+/) // Extraer solo el número
    const maxProducts = numberMatch ? parseInt(numberMatch[0], 10) : null

    expect(maxProducts).toBe(MAX_PRODUCTS - mockRow.items.length)
  })

  test('submits form with selected products', () => {
    const addNewRowSpy = vi.spyOn(templateContextMock.rows, 'addNewRow')
    const propsWithSelectedProducts = {
      ...mockProps,
      selectedProducts: [thridProduct]
    }

    renderWithContext(<ProductList {...propsWithSelectedProducts} />)

    const form = screen.getByTestId('product-form')
    fireEvent.submit(form)

    expect(addNewRowSpy).toHaveBeenCalledWith([thridProduct])
    expect(mockProps.setSelectedProducts).toHaveBeenCalledWith([])
    expect(mockProps.handleClose).toHaveBeenCalled()
  })

  test('adds items to existing row when editedRowId is provided', () => {
    const addItemToRowSpy = vi.spyOn(templateContextMock.rows, 'addItemToRow')
    const propsWithEditedRow = {
      ...mockProps,
      editedRowId: mockRow.id,
      selectedProducts: [thridProduct]
    }

    renderWithContext(<ProductList {...propsWithEditedRow} />)

    const form = screen.getByTestId('product-form')
    fireEvent.submit(form)

    expect(addItemToRowSpy).toHaveBeenCalledWith(mockRow.id, [thridProduct])
  })
})
