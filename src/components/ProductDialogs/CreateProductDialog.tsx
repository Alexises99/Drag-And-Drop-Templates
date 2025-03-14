import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'
import CreateProduct from './CreateProduct'
import DialogControls from './DialogControls'
import { useState } from 'react'
import { ProductDialog } from '@types'
import productUtils, { defaultProduct } from '@utils/products'

interface CreateProductDialogProps {
  handleClose: (reset?: () => void) => void
}

export default function CreateProductDialog({
  handleClose
}: CreateProductDialogProps) {
  const [product, setProduct] = useState<ProductDialog>(defaultProduct)

  const [error, setError] = useState<string | null>(null)

  const closeDialog = () => {
    handleClose(() => {
      setProduct(defaultProduct)
      setError(null)
    })
  }

  return (
    <>
      <h3 className="mb-4 text-center text-2xl text-black">
        <FormattedMessage id="dialog.create.title" />
      </h3>
      <CreateProduct
        handleClose={closeDialog}
        setError={setError}
        product={product}
        error={error}
        setProduct={setProduct}
      />
      <DialogControls
        handleClose={closeDialog}
        disabledSubmit={!productUtils.checkProductIsCompleted(product)}
      />
    </>
  )
}
