import { useDispatch, useSelector } from "react-redux"
import { increaseVote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const { anecdotes } = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    filteredAnecdotes.sort((a, b) => a.votes < b.votes ? 1 : -1)
    const dispatch = useDispatch()
    
    const vote = (id) => {
        dispatch(increaseVote(id))
    }

    return(
        <ul>
            {filteredAnecdotes.map(anecdote =>
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
