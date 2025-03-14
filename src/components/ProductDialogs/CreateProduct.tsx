import { useTemplate } from '@hooks/useTemplate'
import {
  DragEvent,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction
} from 'react'
import ProductField from './ProductField'
import { useIntl } from 'react-intl'
import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'
import { Product, ProductDialog } from '@types'

interface CreateProductProps {
  handleClose: () => void
  setProduct: Dispatch<SetStateAction<ProductDialog>>
  setError: Dispatch<SetStateAction<string | null>>
  product: ProductDialog
  error: string | null
}

export default function CreateProduct({
  handleClose,
  setError,
  setProduct,
  error,
  product
}: CreateProductProps) {
  const {
    products: { addProduct, productsData }
  } = useTemplate()

  const intl = useIntl()

  const { image, name, price } = product

  const handleChangeFields = (key: keyof typeof product) => (value: string) => {
    setProduct((prev) => ({
      ...prev,
      [key]: key === 'price' ? Number(value) : value
    }))
  }

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => handleChangeFields('image')(reader.result as string)
    reader.readAsDataURL(file)
  }
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    handleFile(event.target.files[0])
    setError('')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!product.image) {
      setError(
        intl.formatMessage({
          id: 'dialog.create.error.image'
        })
      )
      return
    }
    if (Object.keys(productsData).includes(product.name)) {
      setError(
        intl.formatMessage({
          id: 'dialog.create.error.name'
        })
      )
      return
    }

    const copyProduct: Product = { ...product, price: Number(product.price) }

    addProduct(copyProduct)
    handleClose()
  }

  return (
    <form onSubmit={handleSubmit} id="product-form" data-testid="product-form">
      <div className="my-12 flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <ProductField
          label="Nombre:"
          name="name"
          type="text"
          value={name}
          required
          placeholder="Nombre del producto"
          handleChange={handleChangeFields('name')}
        />
        <div className="relative">
          <ProductField
            label="Precio:"
            name="price"
            type="number"
            value={price}
            required
            placeholder="Precio del producto"
            handleChange={handleChangeFields('price')}
            extra={{ step: 0.01 }}
          />
        </div>
        <div
          className="col-span-2 flex h-56 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-6"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          {image ? (
            <img
              src={image}
              alt={intl.formatMessage({
                id: 'dialog.create.file-input.image.alt'
              })}
              className="max-h-48"
            />
          ) : (
            <span className="text-center">
              <FormattedMessage
                id="dialog.create.file-input"
                values={{
                  select: (
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer text-blue-500"
                      key={'select-file'}
                    >
                      <FormattedMessage id="dialog.create.file-input.select" />
                    </label>
                  )
                }}
              />
            </span>
          )}
          <input
            name="file"
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      </div>
      {error ? (
        <span className="mx-auto block w-fit text-red-400">{error}</span>
      ) : null}
    </form>
  )
}
