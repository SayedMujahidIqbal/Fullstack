import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useState } from "react"
import Notification from "./Notification"

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote)) 
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
