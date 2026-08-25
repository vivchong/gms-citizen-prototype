import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyTheme, watchSystemTheme } from './theme'

// index.html already resolved the theme before first paint; re-run here so a
// ?theme= param is persisted, then keep following the device while in auto mode.
applyTheme()
watchSystemTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
