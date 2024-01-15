import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { rootReducer } from './components/Redux/rootReducer.js'
import App from './components/App/App'

const store = configureStore({ reducer: rootReducer })

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
