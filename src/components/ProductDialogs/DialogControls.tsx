import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'
import StyledButton from '@components/StyledButton'

interface DialogControlsProps {
  handleClose: () => void
  disabledSubmit?: boolean
}

export default function DialogControls({
  handleClose,
  disabledSubmit = false
}: DialogControlsProps) {
  return (
    <div className="flex justify-center gap-8">
      <button
        className="cursor-pointer px-12 text-black"
        onClick={handleClose}
        type="button"
      >
        <FormattedMessage id="dialog.dialog-controls.cancel" />
      </button>
      <StyledButton
        type="submit"
        extraProps={{ form: 'product-form', disabled: disabledSubmit }}
      >
        <FormattedMessage id="dialog.dialog-controls.save" />
      </StyledButton>
    </div>
  )
}
