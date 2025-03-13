import DialogProvider from '@context/DialogContext'
import { render } from '@testing-library/react'
import { PropsWithChildren, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import localesEs from '../locales/es.json'
import { templateContextMock } from './mocks/useTemplate.mock'
import { TemplateContext } from '@context/TemplateContext'

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
