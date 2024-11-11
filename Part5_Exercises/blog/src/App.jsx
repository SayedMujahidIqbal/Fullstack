import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ error: '', success: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  blogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
      setMessage({ success: `${user.name} LoggedIn successfully` })
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

  const addBlog = async (blogObject) => {
     const createdBlog = await blogService.createBlog(blogObject)
     if(createdBlog){
        setBlogs(blogs.concat(createdBlog))
        setMessage({ success: `A blog  ${createdBlog.title} by ${createdBlog.author} added` })
        setTimeout(() => {
          setMessage({ success: '' })
        }, 3000)
      }
  }

  const handleLikes = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }   
    const resultantBlog = await blogService.updatedBlog(id, updatedBlog)
    setBlogs(blogs.map(blog => blog.id === id ? resultantBlog : blog))
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    alert(`Remove blog ${blog.title} by ${blog.author}`)
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
      setMessage({ success: `${blog.title} by ${blog.author} removed` })
      setTimeout(() => {
        setMessage({ success: '' })
      }, 3000) 
    } catch (error) {
      setMessage({ error: 'You are not authorized to delete this blog' })
      setTimeout(() => {
        setMessage({ error: '' })
      }, 3000) 
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input 
          type="text" 
          name="username"
          onChange={({ target }) => setUsername(target.value)} 
          data-testid="username" 
        />
      </div>
      <div>
        <input 
          type="password" 
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          data-testid="password"  
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => {
    return(
      <Togglable buttonLabel="create new blog">
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }


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
          <Blog 
            key={blog.id} 
            blog={blog} 
            updateLikes={() => handleLikes(blog.id)}
            deleteBlog={() => deleteBlog(blog.id)} 
          />
      )}
    </div>
  )
}


export default App