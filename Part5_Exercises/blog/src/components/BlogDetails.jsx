import React from 'react'

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

export default BlogDetails
