import { describe, test, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import CreateProduct from '@components/ProductDialogs/CreateProduct'
import { renderWithContext, translate } from '../test-utils'
import { templateContextMock } from '../mocks/useTemplate.mock'
import { act } from 'react'

describe('CreateProduct', () => {
  const mockHandleClose = vi.fn()

  const props = {
    error: null,
    product: { name: '', price: '', image: '' },
    setError: vi.fn(),
    setProduct: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders form fields correctly', () => {
    renderWithContext(
      <CreateProduct handleClose={mockHandleClose} {...props} />
    )

    expect(screen.getByLabelText(/nombre:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/precio:/i)).toBeInTheDocument()
    expect(
      screen.getByText(/arrastra y suelta una imagen/i)
    ).toBeInTheDocument()
  })

  test('updates name field value correctly', () => {
    renderWithContext(
      <CreateProduct handleClose={mockHandleClose} {...props} />
    )

    const nameInput = screen.getByLabelText(/nombre:/i)
    fireEvent.change(nameInput, { target: { value: 'Test Product' } })

    expect(props.setProduct).toHaveBeenCalled()
  })

  test('updates price field value correctly', () => {
    renderWithContext(
      <CreateProduct handleClose={mockHandleClose} {...props} />
    )

    const priceInput = screen.getByLabelText(/precio:/i)
    fireEvent.change(priceInput, { target: { value: '99.99' } })

    expect(props.setProduct).toHaveBeenCalled()
  })

  test('shows error when submitting without image', () => {
    const addProducSpyOn = vi.spyOn(templateContextMock.products, 'addProduct')
    renderWithContext(
      <CreateProduct handleClose={mockHandleClose} {...props} />
    )

    const form = screen.getByTestId('product-form')
    fireEvent.submit(form)

    expect(props.setError).toHaveBeenCalledWith(
      translate('dialog.create.error.image')
    )
    expect(addProducSpyOn).not.toHaveBeenCalled()
  })

  test('shows error when product name already exists', () => {
    renderWithContext(
      <CreateProduct
        handleClose={mockHandleClose}
        {...props}
        product={{
          name: 'Straight Fit Regular',
          price: '20',
          image: 'new-test.jpg'
        }}
      />
    )
    const form = screen.getByTestId('product-form')
    fireEvent.submit(form)
    expect(props.setError).toHaveBeenCalledWith(
      translate('dialog.create.error.name')
    )
  })

  test('handles image upload correctly', async () => {
    renderWithContext(
      <CreateProduct handleClose={mockHandleClose} {...props} />
    )

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

    await waitFor(() => {
      expect(props.setProduct).toHaveBeenCalledWith(expect.any(Function))
    })

    expect(props.setProduct).toHaveBeenCalledWith(expect.any(Function))

    expect(props.setError).toHaveBeenCalled()

    const updateFunction = props.setProduct.mock.calls[0][0]
    const prevState = { image: '', name: 'Test', price: 10 }
    const newState = updateFunction(prevState)

    expect(newState.image).toBe('data:image/png;base64,dummy')
  })

  test('submits form with valid data', async () => {
    renderWithContext(
      <CreateProduct
        handleClose={mockHandleClose}
        {...props}
        product={{
          name: 'Test Product',
          price: '99.99',
          image: ''
        }}
      />
    )

    const product = {
      name: 'Test Product',
      price: 99.99,
      image: 'data:image/png;base64,dummy'
    }

    const fileInput = screen.getByLabelText(/selecciona una/i)
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' })

    // Fill form data
    act(() => {
      fireEvent.change(screen.getByLabelText(/nombre:/i), {
        target: { value: product.name }
      })
      fireEvent.change(screen.getByLabelText(/precio:/i), {
        target: { value: product.price.toString() }
      })
    })

    // Mock FileReader
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

    // Esperar a que el estado se actualice con la imagen
    await waitFor(() => {
      expect(props.setProduct).toHaveBeenCalledWith(expect.any(Function))
    })

    // Extraer la función pasada a setProduct y simular su ejecución
    const updateFunction = props.setProduct.mock.calls[0][0]
    const prevState = {
      name: product.name,
      price: product.price,
      image: product.image
    }
    const newState = updateFunction(prevState)

    expect(newState.image).toBe(product.image)
  })
})
