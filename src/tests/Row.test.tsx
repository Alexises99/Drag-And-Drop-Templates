import Row from '../components/Row/Row'
import { screen, fireEvent } from '@testing-library/react'
import { type Row as RowType } from '@types'
import { renderWithContext } from './test-utils'
import { initialProducts } from '../data/products'
import { templateContextMock } from './mocks/useTemplate.mock'
// import userEvent from '@testing-library/user-event'

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
    expect(screen.getByText('Untitled Row')).toBeInTheDocument()
  })

  test('Add product works correctl', async () => {
    renderWithContext(<Row openDialog={openDialogMock} row={row} />)
    const button = await screen.findByText('Añadir Productos')
    fireEvent.click(button)
    expect(openDialogMock).toHaveBeenCalledTimes(1)
  })

  test('Delete row works correctly', async () => {
    const deleteRowSpy = vi.spyOn(templateContextMock.rows, 'deleteRow')
    renderWithContext(<Row openDialog={openDialogMock} row={row} />)
    const deleteButton = screen.getByTestId('remove-row')
    fireEvent.click(deleteButton)

    expect(deleteRowSpy).toHaveBeenCalled()
    expect(deleteRowSpy).toHaveBeenCalledWith(row.id)
  })

  // test('Change category name works correctly', async () => {
  //   const changeCategoryNameSpy = vi.spyOn(
  //     templateContextMock.rows,
  //     'changeCategoryName'
  //   )
  //   renderWithContext(<Row openDialog={openDialogMock} row={row} />)

  //   // Click en el div para activar el modo edición
  //   const categoryDiv = screen.getByTestId('change-category-name')
  //   await userEvent.click(categoryDiv)

  //   // Ahora buscamos el input que aparece después del click
  //   const input = screen.getByRole('textbox')
  //   expect(input).toBeInTheDocument()

  //   // Cambiamos el valor
  //   await userEvent.clear(input)
  //   await userEvent.type(input, 'New Category Name')

  //   // Simulamos perder el foco
  //   fireEvent.blur(input)

  //   // Verificamos que se llamó al método con los argumentos correctos
  //   expect(changeCategoryNameSpy).toHaveBeenCalledWith(
  //     row.id,
  //     'New Category Name'
  //   )

  //   // Verificamos que volvemos al modo visualización
  //   expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  // })

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
