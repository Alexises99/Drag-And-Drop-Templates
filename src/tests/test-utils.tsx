import DialogProvider from '@context/Dialog/DialogProvider'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import localesEs from '../locales/es.json'
import { templateContextMock } from './mocks/useTemplate.mock'
import {
  TemplateContext,
  TemplateContextValue
} from '@context/Template/Template/TemplateContext'
import { type PropsWithChildren, type ReactNode } from 'react'

export const translate = (key: keyof typeof localesEs) => localesEs[key] // Helper to get translation

export const wrapperIntl = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider locale="es" messages={localesEs}>
    {children}
  </IntlProvider>
)

function TestTemplateProvider({
  children,
  value
}: PropsWithChildren<{ value: TemplateContextValue | undefined }>) {
  return (
    <TemplateContext value={value ?? templateContextMock}>
      {children}
    </TemplateContext>
  )
}

export const renderWithContext = (
  ui: ReactNode,
  value?: TemplateContextValue
) => {
  return render(
    <IntlProvider locale="es" messages={localesEs}>
      <DialogProvider>
        <TestTemplateProvider value={value}>{ui}</TestTemplateProvider>
      </DialogProvider>
    </IntlProvider>
  )
}
