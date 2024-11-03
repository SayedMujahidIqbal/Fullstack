const BlogForm = ({
    handleSubmit,
    title,
    author,
    url,
    handleTitleChange,
    handleAuthorChange,
    handleURLChange
}) => {
    return(
        <form onSubmit={handleSubmit}>
        <div>
          title:
          <input 
            value={title}
            onChange={handleTitleChange}  
          />
        </div>
        <div>
          Author:
          <input 
            value={author}
            onChange={handleAuthorChange}  
          />
        </div>
        <div>
          URL:
          <input 
            value={url}
            onChange={handleURLChange}  
          />
        </div>
        <button type='submit'>Add Blog</button>
      </form> 
    )
}

export default BlogForm