import { type Ref, useImperativeHandle, useRef } from 'react'

export interface DialogMethods {
  close: () => void
  show: () => void
}

export default function useDialog(ref: Ref<DialogMethods>) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => ({
    close: () => dialogRef.current?.close(),
    show: () => dialogRef.current?.showModal()
  }))

  return dialogRef
}
