import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './themes.css'

const saved = localStorage.getItem('theme')
if (saved) document.documentElement.setAttribute('data-theme', saved)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
