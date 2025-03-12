import { UniqueIdentifier } from '@dnd-kit/core'
import { DialogMethods } from '@hooks/useDialog'
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useRef,
  useState
} from 'react'

type DialogMode = 'list' | 'form'

interface DialogContextValues {
  openDialog: (mode: DialogMode, editedRow?: UniqueIdentifier) => void
  closeDialog: () => void

  dialogMode: DialogMode
  dialogRef: RefObject<DialogMethods | null>
  editedRow: UniqueIdentifier | null
}

export const DialogContext = createContext<DialogContextValues | null>(null)

export default function DialogProvider({ children }: PropsWithChildren) {
  const dialogRef = useRef<DialogMethods>(null)

  const [mode, setMode] = useState<DialogMode>('list')
  const [editedRow, setEditedRow] = useState<UniqueIdentifier | null>(null)

  const openDialog = (mode: DialogMode, editedRow?: UniqueIdentifier) => {
    setMode(mode)
    setEditedRow(editedRow ?? null)

    dialogRef.current?.show()
  }

  const closeDialog = () => {
    dialogRef.current?.close()
    setEditedRow(null)
  }

  const values = {
    openDialog,
    closeDialog,
    dialogMode: mode,
    dialogRef,
    editedRow
  }

  return <DialogContext value={values}>{children}</DialogContext>
}
