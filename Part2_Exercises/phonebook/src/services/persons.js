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

export default {
    getAll,
    create
}