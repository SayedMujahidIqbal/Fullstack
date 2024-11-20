import { useDispatch, useSelector } from "react-redux"
import { increaseVote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    anecdotes.sort((a, b) => a.votes < b.votes ? 1 : -1)

    const vote = (id) => {
        dispatch(increaseVote(id))
    }

    return(
        <ul>
            {anecdotes.map(anecdote =>
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
