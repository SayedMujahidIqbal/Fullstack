import { useDispatch, useSelector } from "react-redux"
import { incrementVote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if(filter === ''){
            return anecdotes
        }else{
            return [...anecdotes.anecdotes].filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        }
        
    })

    console.log(anecdotes)

    const sortedAnecdotes = [...anecdotes].sort((a, b) => a.votes < b.votes ? 1 : -1)
    
    const vote = (id) => {
        dispatch(incrementVote(id))
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
