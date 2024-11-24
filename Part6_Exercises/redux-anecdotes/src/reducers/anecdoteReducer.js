import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdoteServices'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdotes(state, action){
      return state.concat(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    updatedAnecdotes(state, action){
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
    }
  }
})

export const { setAnecdotes, appendAnecdotes, updatedAnecdotes } = anecdotesSlice.actions

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const incrementVote = (anecdotToBeUpdated) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.incrementVote(anecdotToBeUpdated)
    dispatch(updatedAnecdotes(updatedAnecdote))
  }
}

export default anecdotesSlice.reducer