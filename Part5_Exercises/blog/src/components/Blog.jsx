import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, updateLikes, deleteBlog }) => {
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

  const showWhenVisible = { display: visible ? '' : 'none' }

 return( 
  <div style={blogStyle}>
    <div style={{ display: "flex" }}>
      <div style={{ display: 'block' }}>
        <div style={{ paddingRight: 4 }} className="title">
          {blog.title}
        </div>
        <div className='author'>
            {blog.author}
        </div>
      </div>
      <div>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
    </div>
    <div style={showWhenVisible} className="details">
        <div className='url'>
            {blog.url}
        </div>
        <div className='likes'>
            Likes {blog.likes} <button onClick={updateLikes}>like</button>
        </div>
        <div style={{ padding: 3 }}>
            <button style={{ borderRadius:5, background: 'lightBlue' }} onClick={deleteBlog}>remove</button>
        </div>
    </div>
  </div>
 )  
}

Blog.propTypes= {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog