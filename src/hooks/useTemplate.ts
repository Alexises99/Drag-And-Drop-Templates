import { TemplateContext } from '@context/TemplateContext'
import { use } from 'react'

export default function useTemplate() {
  const context = use(TemplateContext)

  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider')
  }

  return context
}
