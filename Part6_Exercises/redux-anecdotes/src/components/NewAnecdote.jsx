import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationMessage } from '../reducers/notificationReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(notificationMessage(`Anecdote ${anecdote} added`, 3))
    }

    return (
        <form onSubmit={addNewAnecdote}>
            <input name="anecdote" />
            <button type="submit">Add anecdote</button>
        </form>
    )
}

export default NewAnecdote
