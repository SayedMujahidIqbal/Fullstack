import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'


const getAll = () => { 
    const request = axios.get(baseUrl)
    return request.then(response => response.data).catch(error => console.log(error))
}

const create = newPersonObject => {
    const request = axios.post(baseUrl, newPersonObject)
    return request.then(response => response.data).catch(error => console.log(error))
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data).catch(error => console.log(error))
}

const update = (id, personObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data).catch(error => console.log(error))
}

export default {
    getAll,
    create,
    deletePerson,
    update
}