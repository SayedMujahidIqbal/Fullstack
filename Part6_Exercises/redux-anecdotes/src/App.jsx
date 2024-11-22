import { useDispatch, useSelector } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  setTimeout(() => {
    dispatch(setNotification(''))
  }, 5000)

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