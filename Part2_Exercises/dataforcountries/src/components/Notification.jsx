import React from 'react'

const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        backgroud: 'darkgrey',
        fontSize: 16,
    }
  return (
    <div style={notificationStyle} >
      {message}
    </div>
  )
}

export default Notification
