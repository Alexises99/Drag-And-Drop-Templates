import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TemplateProvider from './context/TemplateContext.tsx'
import DialogProvider from '@context/DialogContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DialogProvider>
      <TemplateProvider>
        <App />
      </TemplateProvider>
    </DialogProvider>
  </StrictMode>
)
