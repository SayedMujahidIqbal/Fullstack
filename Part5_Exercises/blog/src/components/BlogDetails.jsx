import React from 'react'

const BlogDetails = ({ blog, visible, updateLikes }) => {
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
    </div>
  )
}

export default BlogDetails
