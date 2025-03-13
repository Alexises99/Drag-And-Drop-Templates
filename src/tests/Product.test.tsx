import { fireEvent, render, screen } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import Product from '@components/Product/Product'

describe('Product', () => {
  const mockProduct = {
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg'
  }

  const defaultProps = {
    product: mockProduct
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <IntlProvider locale="es" messages={{}}>
      {children}
    </IntlProvider>
  )

  test('renders product information correctly', () => {
    render(<Product {...defaultProps} />, { wrapper })

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByAltText('Test Product')).toHaveAttribute(
      'src',
      'test-image.jpg'
    )
    expect(screen.getByText('99,99 €')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const { container } = render(
      <Product {...defaultProps} className="custom-class" />,
      { wrapper }
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  test('shows delete icon when handleDelete is provided', () => {
    const handleDelete = vi.fn()
    render(<Product {...defaultProps} handleDelete={handleDelete} />, {
      wrapper
    })

    const deleteIcon = screen.getByTestId('mock-svg')
    expect(deleteIcon).toBeInTheDocument()
  })

  test('calls handleDelete with product name when clicking delete icon', () => {
    const handleDelete = vi.fn()
    render(<Product {...defaultProps} handleDelete={handleDelete} />, {
      wrapper
    })

    const deleteIcon = screen.getByTestId('delete-product')
    fireEvent.mouseDown(deleteIcon)

    expect(handleDelete).toHaveBeenCalledWith('Test Product')
  })

  test('does not show delete icon when handleDelete is not provided', () => {
    render(<Product {...defaultProps} />, { wrapper })

    const deleteIcon = screen.queryByTestId('mock-svg')
    expect(deleteIcon).not.toBeInTheDocument()
  })

  test('renders children components', () => {
    render(
      <Product {...defaultProps}>
        <div data-testid="child">Child Component</div>
      </Product>,
      { wrapper }
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })
})
