import { fireEvent, render, screen } from '@testing-library/react'

import Product from '@components/Product/Product'
import { wrapperIntl } from '../test-utils'

describe('Product', () => {
  const mockProduct = {
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg'
  }

  const defaultProps = {
    product: mockProduct
  }

  test('renders product information correctly', () => {
    render(<Product {...defaultProps} />, { wrapper: wrapperIntl })

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(
      screen.getByAltText(`Imagen del producto ${mockProduct.name}`)
    ).toHaveAttribute('src', mockProduct.image)
    expect(
      screen.getByText(`${mockProduct.price.toString().replace('.', ',')} €`)
    ).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const { container } = render(
      <Product {...defaultProps} className="custom-class" />,
      { wrapper: wrapperIntl }
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  test('shows delete icon when handleDelete is provided', () => {
    const handleDelete = vi.fn()
    render(<Product {...defaultProps} handleDelete={handleDelete} />, {
      wrapper: wrapperIntl
    })

    const deleteIcon = screen.getByTestId('mock-svg')
    expect(deleteIcon).toBeInTheDocument()
  })

  test('calls handleDelete with product name when clicking delete icon', () => {
    const handleDelete = vi.fn()
    render(<Product {...defaultProps} handleDelete={handleDelete} />, {
      wrapper: wrapperIntl
    })

    const deleteIcon = screen.getByTestId('delete-product')
    fireEvent.mouseDown(deleteIcon)

    expect(handleDelete).toHaveBeenCalledWith(mockProduct.name)
  })

  test('does not show delete icon when handleDelete is not provided', () => {
    render(<Product {...defaultProps} />, { wrapper: wrapperIntl })

    const deleteIcon = screen.queryByTestId('mock-svg')
    expect(deleteIcon).not.toBeInTheDocument()
  })

  test('renders children components', () => {
    render(
      <Product {...defaultProps}>
        <div data-testid="child">Child Component</div>
      </Product>,
      { wrapper: wrapperIntl }
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })
})
