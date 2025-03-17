import { DialogMethods } from '@hooks/useDialog'
import { createContext, type RefObject } from 'react'

import { type UniqueIdentifier } from '@dnd-kit/core'

import { DialogMode } from '@types'
interface DialogContextValues {
  openDialog: (mode: DialogMode, editedRow?: UniqueIdentifier) => void
  closeDialog: () => void

  dialogMode: DialogMode
  dialogRef: RefObject<DialogMethods | null>
  editedRow: UniqueIdentifier | null
}

export const DialogContext = createContext<DialogContextValues | null>(null)
