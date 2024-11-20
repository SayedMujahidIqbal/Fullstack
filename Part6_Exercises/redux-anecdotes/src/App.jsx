import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdote'
import SearchFilter from './components/SearchFilter'

const App = () => {
  return (
    <div>
      <SearchFilter />
      <h2>Anecdotes</h2>
       <AnecdoteList /> 
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App