import { describe, test, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import RowContainer from '@components/RowContainer'
import { useDialogContext } from '@hooks/useDialogContext'
import { renderWithContext, translate } from '../test-utils'
import { mockRow, templateContextMock } from '../mocks/useTemplate.mock'

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
    renderWithContext(<RowContainer isOrderingContainer={false} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(mockRow.items.length)
  })

  test('applies correct zoom transformation styles', () => {
    renderWithContext(<RowContainer isOrderingContainer={false} />)

    const container = screen.getByRole('list')
    expect(container).toHaveStyle({
      transform: 'scale(1)',
      transformOrigin: 'top left',
      width: '100%'
    })
  })

  test('renders CreateRow component', () => {
    renderWithContext(<RowContainer isOrderingContainer={false} />)

    expect(screen.getByText(translate('list.create-row'))).toBeInTheDocument()
  })

  test('handles empty rowContainers', () => {
    renderWithContext(<RowContainer isOrderingContainer={false} />, {
      ...templateContextMock,
      rows: { ...templateContextMock.rows, rowContainers: [] }
    })

    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('+ Añadir Fila')).toBeInTheDocument()
  })

  test('calls openDialog with correct parameters', () => {
    renderWithContext(<RowContainer isOrderingContainer={false} />)

    // Trigger dialog open for a specific row
    const firstRow = screen.getByText(translate('row.add-product'))
    firstRow.click()

    expect(mockOpenDialog).toHaveBeenCalledWith('list', mockRow.id)
  })
})
