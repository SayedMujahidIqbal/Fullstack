import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotes = anecdotesAtStart.map(asObject)

const initialState = {
  filter: '',
  anecdotes: [...anecdotes]
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action){
      const newAnecdotes = state.anecdotes.concat(action.payload)
      console.log(newAnecdotes)
      return state.anecdotes.concat(action.payload)
    },
    incrementVote(state, action){
      const id = action.payload.id
      console.log("state", state)
      const anecdoteToIncreaseVote = state.anecdotes.find(a => a.id === id)
      console.log(anecdoteToIncreaseVote)
      const changedAnecdote = {
        ...anecdoteToIncreaseVote,
        votes: anecdoteToIncreaseVote.votes + 1
      }
      return state.anecdotes.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    }
  }
})


export const { createAnecdote, incrementVote } = anecdotesSlice.actions
export default anecdotesSlice.reducer