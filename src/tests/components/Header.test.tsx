import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@components/Header'
import { useDialogContext } from '@hooks/useDialogContext'
import { wrapperIntl } from '../test-utils'

// Mock useDialogContext hook
vi.mock('@hooks/useDialogContext', () => ({
  useDialogContext: vi.fn()
}))

describe('Header', () => {
  const mockOpenDialog = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Setup mock implementation
    vi.mocked(useDialogContext).mockReturnValue({
      openDialog: mockOpenDialog,
      closeDialog: vi.fn(),
      dialogMode: 'list',
      dialogRef: { current: null },
      editedRow: null
    })
  })

  test('renders logo', () => {
    render(<Header />, { wrapper: wrapperIntl })
    const logo = screen.getByAltText('Zara logo')

    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'mock-svg')
    expect(logo).toHaveClass('max-h-14')
  })

  test('renders create product button', () => {
    render(<Header />, { wrapper: wrapperIntl })
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  test('opens dialog when create product button is clicked', () => {
    render(<Header />, { wrapper: wrapperIntl })
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(mockOpenDialog).toHaveBeenCalledTimes(1)
    expect(mockOpenDialog).toHaveBeenCalledWith('form')
  })

  test('header has correct layout classes', () => {
    const { container } = render(<Header />, { wrapper: wrapperIntl })
    const header = container.querySelector('header')

    expect(header).toHaveClass('flex', 'items-end', 'justify-between')
  })
})
