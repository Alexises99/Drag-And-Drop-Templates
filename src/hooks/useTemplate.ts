import { TemplateContext } from '@context/Template/Template/TemplateContext'
import { use } from 'react'

export function useTemplate() {
  const context = use(TemplateContext)

  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider')
  }

  return context
}
