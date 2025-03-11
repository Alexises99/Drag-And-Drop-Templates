import { DialogContext } from '@context/DialogContext'
import { use } from 'react'

export default function useDialogContext() {
  const context = use(DialogContext)

  if (!context) {
    throw new Error(
      'useDialogContext must be used within a DialogContextProvider'
    )
  }

  return context
}
