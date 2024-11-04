import { useState } from "react"
import blogServices from '../services/blogs'

const Blog = ({ blog, updateLikes }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

 return( 
  <div style={blogStyle}>
      <div style={{ display: "flex" }}>
        <div style={{ paddingRight: 4 }}>
          {blog.title}
        </div>
        <div>
          <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        </div>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} <button onClick={() => updateLikes(blog.id)}>like</button>
        </div>
      </div>
  </div>
 )  
}

export default Blog