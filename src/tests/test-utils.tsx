import DialogProvider from '@context/Dialog/DialogProvider'
import { render } from '@testing-library/react'
import { PropsWithChildren, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import localesEs from '../locales/es.json'
import { templateContextMock } from './mocks/useTemplate.mock'
import { TemplateContext } from '@context/Template/Template/TemplateContext'

export const translate = (key: keyof typeof localesEs) => localesEs[key] // Helper to get translation

export const wrapperIntl = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider locale="es" messages={localesEs}>
    {children}
  </IntlProvider>
)

function TestTemplateProvider({ children }: PropsWithChildren) {
  return (
    <TemplateContext value={templateContextMock}>{children}</TemplateContext>
  )
}

export const renderWithContext = (ui: ReactNode) => {
  return render(
    <IntlProvider locale="es" messages={localesEs}>
      <DialogProvider>
        <TestTemplateProvider>{ui}</TestTemplateProvider>
      </DialogProvider>
    </IntlProvider>
  )
}
