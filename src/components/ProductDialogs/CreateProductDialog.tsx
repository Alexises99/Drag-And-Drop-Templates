import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'
import CreateProduct from './CreateProduct'
import DialogControls from './DialogControls'

interface CreateProductDialogProps {
  handleClose: (reset?: () => void) => void
}

export default function CreateProductDialog({
  handleClose
}: CreateProductDialogProps) {
  return (
    <>
      <h3 className="mb-4 text-center text-2xl text-black">
        <FormattedMessage id="dialog.create.title" />
      </h3>
      <CreateProduct handleClose={handleClose} />
      <DialogControls handleClose={() => handleClose()} />
    </>
  )
}
