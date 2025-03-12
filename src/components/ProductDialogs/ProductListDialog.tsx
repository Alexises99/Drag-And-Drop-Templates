import { useState } from 'react'
import ProductList from './ProductList'
import DialogControls from './DialogControls'
import { UniqueIdentifier } from '@dnd-kit/core'

interface ProductListDialogProps {
  handleClose: (reset?: () => void) => void
  editedRowId: UniqueIdentifier | null
}

export default function ProductListDialog({
  editedRowId,
  handleClose
}: ProductListDialogProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  return (
    <>
      <h3 className="mb-4 text-center text-2xl text-black">
        Selecciona Productos
      </h3>
      <ProductList
        editedRowId={editedRowId}
        handleClose={() => handleClose(() => setSelectedProducts([]))}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <DialogControls handleClose={() => handleClose()} />
    </>
  )
}
