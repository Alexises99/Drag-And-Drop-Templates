import { useState } from 'react'
import ProductList from './ProductList'
import DialogControls from './DialogControls'
import { UniqueIdentifier } from '@dnd-kit/core'
import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'

interface ProductListDialogProps {
  handleClose: (reset?: () => void) => void
  editedRowId: UniqueIdentifier | null
}

export default function ProductListDialog({
  editedRowId,
  handleClose
}: ProductListDialogProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const closeDialog = () => handleClose(() => setSelectedProducts([]))

  return (
    <>
      <h3 className="mb-4 text-center text-2xl text-black">
        <FormattedMessage id="dialog.list.title" />
      </h3>
      <ProductList
        editedRowId={editedRowId}
        handleClose={closeDialog}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <DialogControls
        handleClose={closeDialog}
        disabledSubmit={selectedProducts.length === 0}
      />
    </>
  )
}
