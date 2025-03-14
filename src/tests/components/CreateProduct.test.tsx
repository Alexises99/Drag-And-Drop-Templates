import { describe, test, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import CreateProduct from '@components/ProductDialogs/CreateProduct'
import { renderWithContext, translate } from '../test-utils'
import { templateContextMock } from '../mocks/useTemplate.mock'
import { act } from 'react'

describe.only('CreateProduct', () => {
  const mockHandleClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders form fields correctly', () => {
    renderWithContext(<CreateProduct handleClose={mockHandleClose} />)

    expect(screen.getByLabelText(/nombre:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/precio:/i)).toBeInTheDocument()
    expect(
      screen.getByText(/arrastra y suelta una imagen/i)
    ).toBeInTheDocument()
  })

  test('updates name field value correctly', () => {
    renderWithContext(<CreateProduct handleClose={mockHandleClose} />)

    const nameInput = screen.getByLabelText(/nombre:/i)
    fireEvent.change(nameInput, { target: { value: 'Test Product' } })

    expect(nameInput).toHaveValue('Test Product')
  })

  test('updates price field value correctly', () => {
    renderWithContext(<CreateProduct handleClose={mockHandleClose} />)

    const priceInput = screen.getByLabelText(/precio:/i)
    fireEvent.change(priceInput, { target: { value: '99.99' } })

    expect(priceInput).toHaveValue(99.99)
  })

  test('shows error when submitting without image', () => {
    const addProducSpyOn = vi.spyOn(templateContextMock.products, 'addProduct')
    renderWithContext(<CreateProduct handleClose={mockHandleClose} />)

    const form = screen.getByTestId('product-form')
    fireEvent.submit(form)

    expect(
      screen.getByText('Por favor, inserta una imagen')
    ).toBeInTheDocument()
    expect(addProducSpyOn).not.toHaveBeenCalled()
  })

  test('handles image upload correctly', async () => {
    renderWithContext(<CreateProduct handleClose={mockHandleClose} />)

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' })
    const fileInput = screen.getByLabelText(/selecciona una/i)

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      result: 'data:image/png;base64,dummy',
      onload: null as
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => unknown)
        | null
    }
    vi.spyOn(global, 'FileReader').mockImplementation(
      () => mockFileReader as unknown as FileReader
    )

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } })
    })

    act(() => {
      if (mockFileReader.onload) {
        //@ts-expect-error Cannot avoid this type error
        mockFileReader.onload(new ProgressEvent('load'))
      }
    })

    expect(
      await screen.findByAltText(
        translate('dialog.create.file-input.image.alt')
      )
    ).toBeInTheDocument()
  })

  test('submits form with valid data', () => {
    renderWithContext(<CreateProduct handleClose={mockHandleClose} />)

    const product = {
      name: 'Test Product',
      price: 99.99,
      image: 'data:image/png;base64,dummy'
    }

    const addProducSpyOn = vi.spyOn(templateContextMock.products, 'addProduct')

    const fileInput = screen.getByLabelText(/selecciona una/i)
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' })

    // Fill form data
    act(() => {
      fireEvent.change(screen.getByLabelText(/nombre:/i), {
        target: { value: product.name }
      })
      fireEvent.change(screen.getByLabelText(/precio:/i), {
        target: { value: product.price }
      })
    })

    // Mock image upload
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      result: product.image,
      onload: null as
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => unknown)
        | null
    }
    vi.spyOn(global, 'FileReader').mockImplementation(
      () => mockFileReader as unknown as FileReader
    )

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } })
    })

    act(() => {
      if (mockFileReader.onload) {
        //@ts-expect-error Cannot avoid this type error
        mockFileReader.onload(new ProgressEvent('load'))
      }
    })

    // Submit form
    fireEvent.submit(screen.getByTestId('product-form'))

    expect(addProducSpyOn).toHaveBeenCalledWith({
      name: product.name,
      price: product.price,
      image: product.image
    })
    expect(mockHandleClose).toHaveBeenCalled()
  })
})
