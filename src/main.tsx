import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import TemplateProvider from './context/Template/Template/TemplateProvider.tsx'
import DialogProvider from '@context/Dialog/DialogProvider.tsx'
import { IntlProvider } from 'react-intl'
import localesEs from './locales/es.json'

import './index.css'
import ErrorBoundary from '@components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <IntlProvider locale="es" messages={localesEs}>
        <DialogProvider>
          <TemplateProvider>
            <App />
          </TemplateProvider>
        </DialogProvider>
      </IntlProvider>
    </ErrorBoundary>
  </StrictMode>
)
