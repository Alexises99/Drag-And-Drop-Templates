import Button from '@components/Button'

interface DialogControlsProps {
  handleClose: () => void
}

export default function DialogControls({ handleClose }: DialogControlsProps) {
  return (
    <div className="flex justify-center gap-8">
      <button
        className="cursor-pointer px-12 text-black"
        onClick={handleClose}
        type="button"
      >
        Cancelar
      </button>
      <Button type="submit" extraProps={{ form: 'product-form' }}>
        Guardar
      </Button>
    </div>
  )
}
