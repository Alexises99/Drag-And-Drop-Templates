import useDialog, { DialogMethods } from '@hooks/useDialog'
import { Ref } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useDialogContext } from '@hooks/useDialogContext'
import CreateProductDialog from './CreateProductDialog'
import ProductListDialog from './ProductListDialog'

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

  const handleClose = (reset?: () => void) => {
    dialogRef.current?.close()
    if (reset) reset()
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-dark-gray top-1/2 left-1/2 max-h-[712px] min-h-96 max-w-3xl -translate-1/2 flex-col gap-4 rounded-lg bg-white p-12 py-8 text-gray-800 backdrop:backdrop-blur-[2px] open:flex sm:max-h-[812px]"
    >
      {dialogMode === 'form' ? (
        <CreateProductDialog handleClose={handleClose} />
      ) : (
        <ProductListDialog
          editedRowId={editedRowId}
          handleClose={handleClose}
        />
      )}
    </dialog>
  )
}
