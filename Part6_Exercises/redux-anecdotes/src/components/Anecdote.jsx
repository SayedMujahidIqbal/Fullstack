const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li key={anecdote.id}>
        <p style={{ lineHeight: 0 }}>{anecdote.content}</p>
        <span style={{ lineHeight: 0 }}>has {anecdote.votes}</span>
        <button onClick={() => handleClick(anecdote.id)}>vote</button>
    </li>
  )
}

export default Anecdote
