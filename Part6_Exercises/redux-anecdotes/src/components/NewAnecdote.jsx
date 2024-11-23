import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import anecdoteServices from "../services/anecdoteServices"

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteServices.createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`Anecdote ${anecdote} added`))
    }

    return (
        <form onSubmit={addNewAnecdote}>
            <input name="anecdote" />
            <button type="submit">Add anecdote</button>
        </form>
    )
}

export default NewAnecdote
