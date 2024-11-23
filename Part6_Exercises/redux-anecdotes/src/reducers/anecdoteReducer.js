import { createSlice } from "@reduxjs/toolkit"

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      return state.concat(action.payload)
    },
    incrementVote(state, action){
      const id = action.payload
      const anecdoteToIncreaseVote = state.find(a => a.id === id)
      console.log(anecdoteToIncreaseVote)
      const changedAnecdote = {
        ...anecdoteToIncreaseVote,
        votes: anecdoteToIncreaseVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})


export const { createAnecdote, incrementVote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer