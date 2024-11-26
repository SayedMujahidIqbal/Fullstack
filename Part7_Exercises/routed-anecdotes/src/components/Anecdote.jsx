import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
        <span>{anecdote.content}</span>
        <p style={{ lineHeight: 0 }}>has {anecdote.votes} votes</p>
        <p>For more info see <a href={`anecdote.info`}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote
