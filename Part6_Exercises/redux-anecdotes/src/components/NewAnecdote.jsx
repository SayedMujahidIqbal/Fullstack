import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
    }
    return (
        <form onSubmit={addNewAnecdote}>
            <input name="anecdote" />
            <button type="submit">Add anecdote</button>
        </form>
    )
}

export default NewAnecdote
