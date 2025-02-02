import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const url = useField('text')
    const navigate = useNavigate()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: url.value,
        votes: 0
      })
      navigate('/')
    }

    const handleReset = () => {
      content.reset()
      author.reset()
      url.reset()
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...{...content, reset: undefined}} />
          </div>
          <div>
            author
            <input {...{...author, reset: undefined}} />
          </div>
          <div>
            url for more info
            <input {...{...url, reset: undefined}} />
          </div>
          <button type="submit">create</button>
          <button type="button" onClick={handleReset}>reset</button>
        </form>
      </div>
    ) 
}

export default CreateNew