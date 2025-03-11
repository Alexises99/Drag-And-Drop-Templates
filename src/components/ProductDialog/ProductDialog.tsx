import useDialog, { DialogMethods } from '@hooks/useDialog'
import { Ref } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import CreateProduct from './CreateProduct'

import ProductList from './ProductList'
import useDialogContext from '@hooks/useDialogContext'

interface ProductDialogProps {
  ref: Ref<DialogMethods>
  editedRowId: UniqueIdentifier | null
}

export default function ProductDialog({
  ref,
  editedRowId
}: ProductDialogProps) {
  const dialogRef = useDialog(ref)
  const { dialogMode } = useDialogContext()

  const handleClose = () => {
    dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-dark-gray top-1/2 left-1/2 max-h-[712px] min-h-96 max-w-3xl -translate-1/2 rounded-lg bg-white p-12 py-8 text-gray-800 backdrop:backdrop-blur-[2px] sm:max-h-[812px]"
    >
      <h3 className="mb-8 text-center text-2xl text-black">
        {dialogMode === 'list' ? 'Elige un Producto' : 'Crear Producto'}
      </h3>
      {dialogMode === 'list' ? (
        <ProductList editedRowId={editedRowId} />
      ) : (
        <CreateProduct editedRowId={editedRowId} />
      )}

      <div className="mt-12 flex justify-center gap-8">
        <button
          className="cursor-pointer px-12 text-black"
          onClick={handleClose}
          type="button"
        >
          Cancelar
        </button>
        <button
          form="product-form"
          className="cursor-pointer border-1 border-black px-12 py-2 text-black"
          type="submit"
        >
          Guardar
        </button>
      </div>
    </dialog>
  )
}
