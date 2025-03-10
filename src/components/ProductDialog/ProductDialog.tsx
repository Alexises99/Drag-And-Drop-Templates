import useDialog, { DialogMethods } from '@hooks/useDialog'

import { ChangeEvent, DragEvent, FormEvent, Ref, useState } from 'react'
import ProductField from './ProductField'
import useTemplate from '@hooks/useTemplate'

interface ProductDialogProps {
  ref: Ref<DialogMethods>
}

const defaultProduct = {
  name: '',
  price: -1,
  image: ''
}

export default function ProductDialog({ ref }: ProductDialogProps) {
  const dialogRef = useDialog(ref)

  const {
    products: { addProduct },
    addProductToInitialRow
  } = useTemplate()

  const [product, setProduct] = useState<{
    price: number
    name: string
    image: string
  }>(defaultProduct)

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

  const handleClose = () => {
    dialogRef.current?.close()
    setProduct(defaultProduct)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (product.price === undefined) return
    addProduct(product)
    addProductToInitialRow(product.name)
    handleClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-dark-gray top-1/2 left-1/2 min-h-96 min-w-3xl -translate-1/2 rounded-lg bg-white p-12 py-8 text-gray-800 backdrop:backdrop-blur-[2px]"
    >
      <h3 className="mb-8 text-center text-2xl text-black">Crear Producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="my-12 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
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
              className="before:absolute before:top-1/2 before:right-12 before:-translate-y-1/2 before:content-['EUR']"
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
              <span>
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
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </div>
        <div className="mt-12 flex justify-center gap-8">
          <button
            className="cursor-pointer px-12 text-black"
            onClick={handleClose}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="cursor-pointer border-1 border-black px-12 py-2 text-black"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </dialog>
  )
}
