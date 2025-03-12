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
      <button
        form="product-form"
        className="cursor-pointer border-1 border-black px-12 py-2 text-black"
        type="submit"
      >
        Guardar
      </button>
    </div>
  )
}
