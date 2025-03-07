import { createContext, PropsWithChildren, useState } from 'react'
import { Row } from '../types'

interface TemplateContextValue {
  rows: Row[]
  handleAddRow: () => void
}

export const TemplateContext = createContext<TemplateContextValue | null>(null)

export default function TemplateProvider({ children }: PropsWithChildren) {
  const [rows, setRows] = useState<Row[]>([])

  const handleAddRow = () =>
    setRows((prev) => [...prev, { alignment: 'left', id: prev.length + 1 }])

  const value: TemplateContextValue = { rows, handleAddRow }

  return <TemplateContext value={value}>{children}</TemplateContext>
}
