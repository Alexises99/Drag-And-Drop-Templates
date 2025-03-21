import Category from '@components/Row/Category'
import userEvent from '@testing-library/user-event'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '@testing-library/react'

describe('Category', () => {
  const defaultProps = {
    name: 'Test Category',
    id: 1,
    handleChangeName: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders category name correctly', () => {
    render(<Category {...defaultProps} />)
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument()
  })

  test('change category name works correctly', async () => {
    render(<Category {...defaultProps} />)

    const categoryDiv = screen.getByTestId('change-category-name')
    await userEvent.click(categoryDiv)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue(defaultProps.name)

    const newName = 'New Name'

    await userEvent.clear(input)
    await userEvent.type(input, newName)

    expect(defaultProps.handleChangeName).toHaveBeenCalledTimes(
      newName.length + 1
    )

    fireEvent.blur(input)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  test('enters edit mode on click', async () => {
    render(<Category {...defaultProps} />)

    const categoryDiv = screen.getByTestId('change-category-name')
    await userEvent.click(categoryDiv)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('exits edit mode on blur', async () => {
    render(<Category {...defaultProps} />)

    const categoryDiv = screen.getByTestId('change-category-name')
    await userEvent.click(categoryDiv)

    const input = screen.getByRole('textbox')
    fireEvent.blur(input)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })
})
