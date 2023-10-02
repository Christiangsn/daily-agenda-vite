import React from 'react'
import ReactDOM from 'react-dom'
// import { App } from './App'
// import { AuthProvider } from './context/auth'

import './styles/global.css'

import { AuthProvider } from './context/auth'
import AppRouter from './AppRouter'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>

  </React.StrictMode>,
  document.getElementById('root')
)