import { useState } from "react"
import Notification from "./Notification"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')
    const [message, setMessage] = useState({ error: '', success: '' })

    const addBlog = (event) => {
        event.preventDefault()
        if(title=== '' || author === '' || url === ''){
          setMessage({ error: 'Blog fields cannot be empty' })
          setTimeout(() =>{
            setMessage({ error: '' })
          }, 3000)
        } else {
          createBlog({ title, author, url })
        }
        setTitle('')
        setAuthor('')
        setURL('')
      }

    return(
        <>
            <Notification message={message} />
            <form onSubmit={addBlog}>
                <div>
                title:
                <input 
                    value={title}
                    onChange={({target}) => setTitle(target.value)}  
                />
                </div>
                <div>
                Author:
                <input 
                    value={author}
                    onChange={({target}) => setAuthor(target.value)}  
                />
                </div>
                <div>
                URL:
                <input 
                    value={url}
                    onChange={({target}) => setURL(target.value)}  
                />
                </div>
                <button type='submit'>Add Blog</button>
            </form>
        </> 
    )
}

export default BlogForm