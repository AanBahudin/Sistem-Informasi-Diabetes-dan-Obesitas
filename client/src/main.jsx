import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { render } from 'react-dom'


render(
  <StrictMode>
    <App />
  </StrictMode>, document.getElementById('root')
)
