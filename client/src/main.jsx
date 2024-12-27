import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { render } from 'react-dom'
import { ToastContainer } from 'react-toastify'


render(
  <StrictMode>
    <App />
    <ToastContainer
      position='top-center'
      autoClose={2000} />
  </StrictMode>, document.getElementById('root')
)
