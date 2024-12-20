import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const anecdotes = await axios.get(baseUrl)
    return anecdotes.data
}

const createNew = async (anecdote) => {
    const object = { content: anecdote, votes: 0 }
    const newAnecdote = await axios.post(baseUrl, object)
    return newAnecdote.data
}

const incrementVote = async (updatedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return response.data
}

export default { 
    getAll,
    createNew,
    incrementVote 
}