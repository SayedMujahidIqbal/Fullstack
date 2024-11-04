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

const updatedBlog = (id, blogObject) => {
  const config = {
    headers: { Authorization: token}
  }
  const request = axios.put(`${baseUrl}/${id}`, blogObject, config)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token}
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog, updatedBlog, deleteBlog }