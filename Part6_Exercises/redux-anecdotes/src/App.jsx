import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
       <AnecdoteList /> 
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App