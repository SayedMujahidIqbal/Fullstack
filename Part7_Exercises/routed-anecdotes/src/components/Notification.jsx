import React from 'react'

const Notification = ({ notification }) => {
    const style = {
        border: '10px solid green',
        borderRadius: '10px',
        borderWidth: 5,
        color: 'green',
        padding: 10
    }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
