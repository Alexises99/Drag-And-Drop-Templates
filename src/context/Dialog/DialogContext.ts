import { UniqueIdentifier } from '@dnd-kit/core'
import { DialogMethods } from '@hooks/useDialog'
import { DialogMode } from '@types'
import { createContext, RefObject } from 'react'

interface DialogContextValues {
  openDialog: (mode: DialogMode, editedRow?: UniqueIdentifier) => void
  closeDialog: () => void

  dialogMode: DialogMode
  dialogRef: RefObject<DialogMethods | null>
  editedRow: UniqueIdentifier | null
}

export const DialogContext = createContext<DialogContextValues | null>(null)
