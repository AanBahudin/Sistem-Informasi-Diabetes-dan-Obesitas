import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { render } from 'react-dom'


render(
  <StrictMode>
    <App />
  </StrictMode>, document.getElementById('root')
)
