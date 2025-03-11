import zaraLogo from '/logo.svg'
import useDialogContext from '@hooks/useDialogContext'

export default function Header() {
  const { openDialog } = useDialogContext()
  return (
    <header className="flex items-end justify-between">
      <img src={zaraLogo} alt="Zara logo" className="max-h-14" />
      <button
        className="border-1 px-6 py-2 font-semibold"
        onClick={() => openDialog('form')}
      >
        Crear Producto
      </button>
    </header>
  )
}
