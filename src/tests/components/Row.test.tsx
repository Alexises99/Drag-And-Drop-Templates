import Row from '../../components/Row/Row'
import { screen, fireEvent } from '@testing-library/react'
import { type Row as RowType } from '@types'
import { renderWithContext, translate } from '../test-utils'
import { initialProducts } from '../../data/products'
import { templateContextMock } from '../mocks/useTemplate.mock'
import userEvent from '@testing-library/user-event'

const [first, second] = Object.keys(initialProducts)

const row: RowType = {
  alignment: 'left',
  id: 1,
  items: [first, second],
  name: 'Untitled Row'
}

describe('Row', () => {
  const openDialogMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Renders row with correct title', () => {
    renderWithContext(<Row openDialog={openDialogMock} row={row} />)
    expect(screen.getByText(row.name)).toBeInTheDocument()
  })

  test('Add product works correctl', async () => {
    renderWithContext(<Row openDialog={openDialogMock} row={row} />)
    const button = await screen.findByText(translate('row.add-product'))
    fireEvent.click(button)
    expect(openDialogMock).toHaveBeenCalledTimes(1)
  })

  test('Delete row works correctly', async () => {
    const deleteRowSpy = vi.spyOn(templateContextMock.rows, 'deleteRow')
    renderWithContext(<Row openDialog={openDialogMock} row={row} />)
    const deleteButton = screen.getAllByTestId('remove-row')[0]
    fireEvent.click(deleteButton)

    expect(deleteRowSpy).toHaveBeenCalled()
    expect(deleteRowSpy).toHaveBeenCalledWith(row.id)
  })

  test.only('Change category name works correctly', async () => {
    const changeCategoryNameSpy = vi.spyOn(
      templateContextMock.rows,
      'changeCategoryName'
    )
    renderWithContext(<Row openDialog={openDialogMock} row={row} />)

    const categoryDiv = screen.getByTestId('change-category-name')
    await userEvent.click(categoryDiv)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    await userEvent.clear(input)
    await userEvent.type(input, 'New Category Name')

    fireEvent.blur(input)

    expect(changeCategoryNameSpy).toHaveBeenCalledWith(row.id, '')

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  test('Change alignment works correctly', async () => {
    const changeAlignmentSpy = vi.spyOn(
      templateContextMock.rows,
      'changeAligment'
    )
    renderWithContext(<Row openDialog={openDialogMock} row={row} />)

    const centerButton = screen.getByTestId('center-alignment-button')
    fireEvent.click(centerButton)

    expect(changeAlignmentSpy).toHaveBeenCalledWith(row.id, 'center')
  })

  test('Drag handles are present', () => {
    renderWithContext(<Row openDialog={openDialogMock} row={row} />)

    const dragHandle = screen.getByTestId('row-drag-handle')
    expect(dragHandle).toBeInTheDocument()
  })
})
