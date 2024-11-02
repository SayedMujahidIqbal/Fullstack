import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ error: '', success: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ success: `${user.name} Loggedin successfully` })
      setTimeout(() => {
        setMessage({ success: ''})
      }, 5000)
    } catch (error) {
        setMessage({ error: 'Wrong credentials' })
        setTimeout(() => {
          setMessage({ error: ''})
        }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input 
          type="text" 
          name="username"
          onChange={({ target }) => setUsername(target.value)}  
        />
      </div>
      <div>
        <input 
          type="password" 
          name="password"
          onChange={({ target }) => setPassword(target.value)}  
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {
        user === null 
        ? loginForm()
        :<div><p>{user.name} logged-in</p></div>

      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App