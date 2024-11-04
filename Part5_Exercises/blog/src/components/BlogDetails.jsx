import React from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, visible, updateLikes, deleteBlog }) => {
  return (
    <div style={{ display: visible ? '' : 'none' }}>
        <div>
            {blog.url}
        </div>
        <div>
            {blog.author}
        </div>
        <div>
            Likes {blog.likes} <button onClick={() => updateLikes(blog.id)}>like</button>
        </div>
        <div style={{ padding: 3 }}>
            <button style={{ borderRadius:5, background: 'lightBlue' }} onClick={() => deleteBlog(blog.id)}>remove</button>
        </div>
    </div>
  )
}

BlogDetails.propTypes = {
    blog: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    updateLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default BlogDetails
