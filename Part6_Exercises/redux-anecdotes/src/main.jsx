import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import filterReducer from './reducers/filterReducer'
import App from './App'

import anecdotesReducer from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)