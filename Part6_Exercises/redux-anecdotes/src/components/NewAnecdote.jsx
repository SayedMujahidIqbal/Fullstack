import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        console.log(event.target.anecdote.value)
        event.target.anecdote.value = ''
        dispatch(newAnecdote(anecdote))
    }
    return (
        <form onSubmit={addNewAnecdote}>
            <input name="anecdote" />
            <button type="submit">Add anecdote</button>
        </form>
    )
}

export default NewAnecdote
