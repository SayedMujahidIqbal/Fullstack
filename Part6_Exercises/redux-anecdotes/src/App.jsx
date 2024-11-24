import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'
import { initalizeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initalizeAnecdotes())
  }, [])

  console.log("notification", notification)
  
  return (
    <div>
      {notification && <Notification />}
      <SearchFilter />
      <h2>Anecdotes</h2>
       <AnecdoteList /> 
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App