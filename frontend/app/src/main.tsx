import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ModalContextProvider } from './contexts/ModalContext'
import { DeletedContextProvider } from './contexts/DeletedContext'
import { IdContextProvider } from './contexts/idContext'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IdContextProvider>
      <ModalContextProvider>
        <DeletedContextProvider>
          <App />
        </DeletedContextProvider>
      </ModalContextProvider>
    </IdContextProvider>
  </React.StrictMode>
)
