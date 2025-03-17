import { UniqueIdentifier } from '@dnd-kit/core'
import { DialogMethods } from '@hooks/useDialog'
import { DialogContext } from './DialogContext'

import { type PropsWithChildren, useRef, useState } from 'react'
import type { DialogMode } from '@types'

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
