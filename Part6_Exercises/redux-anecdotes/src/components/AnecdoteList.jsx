import { useDispatch, useSelector } from "react-redux"
import { incrementVote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if(filter === ''){
            return anecdotes
        }else{
            return [...anecdotes].filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        }
        
    })

    const sortedAnecdotes = [...anecdotes].sort((a, b) => a.votes < b.votes ? 1 : -1)
    
    const vote = (id) => {
        dispatch(incrementVote(id))
        const updatedAnecdote = sortedAnecdotes.find(a => a.id === id)
        dispatch(setNotification(`you voted '${updatedAnecdote.content}'`))
    }

    return(
        <ul>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id} 
                    anecdote={anecdote}
                    handleClick={vote}
                />
            )}
        </ul>
    )
  
}

export default AnecdoteList
