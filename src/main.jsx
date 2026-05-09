import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import themes from './data/themes.json'
import { applyTheme } from './utils/applyTheme.js'

const STORAGE_KEY = 'portfolio-theme'
const initialThemeId = localStorage.getItem(STORAGE_KEY) || 'ichigo'
applyTheme(themes.find((theme) => theme.id === initialThemeId) || themes[0])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
