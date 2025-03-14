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

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('input has correct attributes', () => {
    render(<ProductField {...defaultProps} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', defaultProps.type)
    expect(input).toHaveAttribute('name', defaultProps.name)
    expect(input).toHaveAttribute('id', defaultProps.name)
    expect(input).toHaveAttribute('value', defaultProps.value)
    expect(input).toHaveAttribute('placeholder', defaultProps.placeholder)
  })

  test('handles change events', () => {
    render(<ProductField {...defaultProps} />)

    const newValue = 'new value'

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: newValue } })

    expect(defaultProps.handleChange).toHaveBeenCalledWith(newValue)
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
