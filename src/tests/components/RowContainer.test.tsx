import { describe, test, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import RowContainer from '@components/RowContainer'
import { useDialogContext } from '@hooks/useDialogContext'
import { renderWithContext } from '../test-utils'
import { mockRow } from '../mocks/useTemplate.mock'

// Mock the hook
vi.mock('@hooks/useDialogContext', () => ({
  useDialogContext: vi.fn()
}))

describe('RowContainer', () => {
  const mockOpenDialog = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock useDialogContext hook implementation
    vi.mocked(useDialogContext).mockReturnValue({
      openDialog: mockOpenDialog,
      closeDialog: vi.fn(),
      dialogMode: 'form',
      dialogRef: { current: null },
      editedRow: null
    })
  })

  test('renders all rows from rowContainers', () => {
    renderWithContext(<RowContainer />)

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })

  test('applies correct zoom transformation styles', () => {
    renderWithContext(<RowContainer />)

    const container = screen.getByRole('list')
    expect(container).toHaveStyle({
      transform: 'scale(1)',
      transformOrigin: 'top left',
      width: '100%',
      height: '100%'
    })
  })

  test('renders CreateRow component', () => {
    renderWithContext(<RowContainer />)

    expect(screen.getByText('+ Añadir Fila')).toBeInTheDocument()
  })

  // test('handles empty rowContainers', () => {
  //   renderWithContext(<RowContainer />)

  //   expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  //   expect(screen.getByText('+ Añadir Fila')).toBeInTheDocument()
  // })

  test('calls openDialog with correct parameters', () => {
    renderWithContext(<RowContainer />)

    // Trigger dialog open for a specific row
    const firstRow = screen.getAllByRole('button', {
      name: /Añadir Productos/i
    })[0]
    firstRow.click()

    expect(mockOpenDialog).toHaveBeenCalledWith('list', mockRow.id)
  })
})
