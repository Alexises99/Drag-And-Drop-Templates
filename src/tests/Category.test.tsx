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
    expect(screen.getByText('Test Category')).toBeInTheDocument()
  })

  test('change category name works correctly', async () => {
    render(<Category {...defaultProps} />)

    // Click para entrar en modo edición
    const categoryDiv = screen.getByTestId('change-category-name')
    await userEvent.click(categoryDiv)

    // Verificar que el input aparece con el valor actual
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('Test Category')

    const newName = 'New Name'
    // Simular cambio de nombre
    await userEvent.clear(input)
    await userEvent.type(input, newName)

    expect(defaultProps.handleChangeName).toHaveBeenCalledTimes(
      newName.length + 1
    )

    // // Simular que el input pierde el foco
    fireEvent.blur(input)

    // // Verificar que volvemos al modo de visualización
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
