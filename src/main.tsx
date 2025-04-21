import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FintechContextProvider from './context/FintechConextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FintechContextProvider>
        <App />
    </FintechContextProvider>
  </StrictMode>,
)
