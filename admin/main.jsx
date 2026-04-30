import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/index.css'
import { Provider } from 'react-redux'
import { store } from '../src/store'
import Admin from './Admin'

createRoot(document.getElementById('admin-root')).render(
  <StrictMode>
    <Provider store={store}>
      <Admin />
    </Provider>
  </StrictMode>,
)
