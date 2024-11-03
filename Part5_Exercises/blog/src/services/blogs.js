import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (blogObject) => {
  const config = {
    headers: { Authorization: token}
  }
  const request = axios.post(baseUrl, blogObject, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog }