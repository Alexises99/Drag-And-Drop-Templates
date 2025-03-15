import { IntlProvider } from 'react-intl'
import messages from '../locales/es.json'
import { PropsWithChildren } from 'react'

import DialogProvider from '@context/Dialog/DialogProvider'
import { TemplateContext } from '@context/Template/Template/TemplateContext'
import { templateContextMock } from '../tests/mocks/useTemplate.mock'

export function StoryBookIntlProvider({ children }: PropsWithChildren) {
  return (
    <IntlProvider locale="es" messages={messages}>
      {children}
    </IntlProvider>
  )
}

export function StoryBookDecorator({ children }: PropsWithChildren) {
  return (
    <IntlProvider locale="es" messages={messages}>
      <DialogProvider>
        <TemplateContext value={templateContextMock}>
          {children}
        </TemplateContext>
      </DialogProvider>
    </IntlProvider>
  )
}
