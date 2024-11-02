import React from 'react'

const Notification = ({ message }) => {
    if(!message) return null
    const error = message.error
    const success = message.success
    {
        error ? 
        <div className='error'>
            {error}
        </div>
         :
        <div className='success'>
            {success} 
        </div> 
    }
}

export default Notification
