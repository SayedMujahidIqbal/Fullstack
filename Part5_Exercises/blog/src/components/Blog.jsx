import { useState } from "react"
import BlogDetails from "./BlogDetails"
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
    <BlogDetails 
      blog={blog} 
      visible={visible} 
      updateLikes={updateLikes} 
      deleteBlog={deleteBlog}
    />
  </div>
 )  
}

Blog.propTypes= {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog