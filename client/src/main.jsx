import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeProvider from './components/ThemeProvider.jsx'
import StoreContextProvider from './context/Store.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>

      <PersistGate persistor={persistor}>

        <Provider store={store}>

          <StoreContextProvider>
            
            <ThemeProvider>

                <App />
                
            </ThemeProvider>

          </StoreContextProvider>

        </Provider>

      </PersistGate>

  </StrictMode>,
)
