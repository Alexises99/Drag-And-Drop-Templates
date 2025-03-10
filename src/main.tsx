import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TemplateProvider from './context/TemplateContext.tsx'
import DragDropContext from '@context/DragDropContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TemplateProvider>
      <DragDropContext>
        <App />
      </DragDropContext>
    </TemplateProvider>
  </StrictMode>
)
