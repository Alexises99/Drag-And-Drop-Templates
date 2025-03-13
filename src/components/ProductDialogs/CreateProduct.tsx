import { useTemplate } from '@hooks/useTemplate'
import { useState, DragEvent, ChangeEvent, FormEvent } from 'react'
import ProductField from './ProductField'

const defaultProduct = {
  name: '',
  price: -1,
  image: ''
}

interface CreateProductProps {
  handleClose: (reset: () => void) => void
}

export default function CreateProduct({ handleClose }: CreateProductProps) {
  const {
    products: { addProduct }
  } = useTemplate()

  const [product, setProduct] = useState<{
    price: number
    name: string
    image: string
  }>(defaultProduct)

  const [error, setError] = useState<string>('')

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
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!product.image) {
      setError('Por favor, inserta una imagen')
      return
    }
    addProduct(product)
    handleClose(() => setProduct(defaultProduct))
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
            value={price === -1 ? '' : price}
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
            <img src={image} alt="Image Preview" className="max-h-48" />
          ) : (
            <span className="text-center">
              Arrastra y suelta una imagen aqui o{' '}
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-blue-500"
              >
                selecciona una
              </label>
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
      <span className="mx-auto block w-fit text-red-400">{error}</span>
    </form>
  )
}
