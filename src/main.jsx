import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@assets/styles/style.css';
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from '@app/store.js'
import { QueryClientProvider } from '@tanstack/react-query'
import client from '@app/client.js'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Toaster position="top-right" />
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
