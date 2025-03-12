import Button from './Button'
import zaraLogo from '/logo.svg'
import { useDialogContext } from '@hooks/useDialogContext'

export default function Header() {
  const { openDialog } = useDialogContext()
  return (
    <header className="flex items-end justify-between">
      <img src={zaraLogo} alt="Zara logo" className="max-h-14" />
      <Button extraProps={{ onClick: () => openDialog('form') }} type="button">
        Crear Producto
      </Button>
    </header>
  )
}
