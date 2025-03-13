import { render, screen, fireEvent } from '@testing-library/react'
import ProductField from '@components/ProductDialogs/ProductField'
import { vi } from 'vitest'

describe.only('ProductField', () => {
  const defaultProps = {
    label: 'Test Label',
    name: 'test-field',
    value: 'test-value',
    type: 'text' as const,
    handleChange: vi.fn(),
    placeholder: 'Enter value'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders with basic props', () => {
    render(<ProductField {...defaultProps} />)

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('input has correct attributes', () => {
    render(<ProductField {...defaultProps} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('name', 'test-field')
    expect(input).toHaveAttribute('id', 'test-field')
    expect(input).toHaveAttribute('value', 'test-value')
    expect(input).toHaveAttribute('placeholder', 'Enter value')
  })

  test('handles change events', () => {
    render(<ProductField {...defaultProps} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(defaultProps.handleChange).toHaveBeenCalledWith('new value')
  })

  test('applies custom className', () => {
    const { container } = render(
      <ProductField {...defaultProps} className="custom-class" />
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  test('renders number input correctly', () => {
    render(<ProductField {...defaultProps} type="number" value={42} />)

    const input = screen.getByRole('spinbutton')
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('value', '42')
  })

  test('handles required attribute', () => {
    render(<ProductField {...defaultProps} required />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('required')
  })

  test('spreads extra props correctly', () => {
    render(
      <ProductField {...defaultProps} extra={{ minLength: 2, maxLength: 10 }} />
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('minLength', '2')
    expect(input).toHaveAttribute('maxLength', '10')
  })

  test('handles undefined value', () => {
    render(<ProductField {...defaultProps} value={undefined} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('value', '')
  })
})
