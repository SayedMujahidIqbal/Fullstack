import { configureStore } from "@reduxjs/toolkit";

import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdotesReducer from './reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdotesReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
})

export default store