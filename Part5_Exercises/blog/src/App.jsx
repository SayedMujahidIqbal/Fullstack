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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
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
      setMessage({ success: `${user.name} Logged-in successfully` })
      setTimeout(() => {
        setMessage({ success: ''})
      }, 3000)
    } catch (error) {
        setMessage({ error: 'Wrong credentials' })
        setTimeout(() => {
          setMessage({ error: ''})
        }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage({ success: `${user.name} logged-out successfully` })
    setTimeout(() => {
      setMessage({ success: '' })
    }, 3000)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    if(title=== '' || author === '' || url === ''){
      setMessage({ error: 'Blog fields cannot be empty' })
      setTimeout(() =>{
        setMessage({ error: '' })
      }, 3000)
    } else {
      const newBlog = ({
        title: title,
        author: author,
        url: url
      })
  
     const createdBlog = await blogService.createBlog(newBlog)
     if(createdBlog){
        setBlogs(blogs.concat(createdBlog))
        setTitle('')
        setAuthor('')
        setURL('')
        setMessage({ success: `A new blog  ${createdBlog.title} by ${createdBlog.author} added` })
        setTimeout(() => {
          setMessage({ success: '' })
        }, 3000)
      }
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input 
          type="text" 
          name="title"
          onChange={({ target }) => setTitle(target.value)}  
        />
      </div>
      <div>
        Author:
        <input 
          type="text" 
          name="author"
          onChange={({ target }) => setAuthor(target.value)}  
        />
      </div>
      <div>
        URL:
        <input 
          type="text" 
          name="url"
          onChange={({ target }) => setURL(target.value)}  
        />
      </div>
      <button type='submit'>Add Blog</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {
        user === null 
        ? loginForm()
        :<div>
            <p>{user.name} logged-in <button onClick={handleLogout}>logout</button> </p>
            {blogForm()}
          </div>

      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App