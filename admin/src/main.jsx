import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ModeContextProvider } from './context/DarkMode.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>

      <ModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
