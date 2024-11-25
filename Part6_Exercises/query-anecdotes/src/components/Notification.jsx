import { useNotificationMessage } from "../NotificationContext"

const Notification = () => {
  const message = useNotificationMessage()
  const style = {
    border: '10px solid green',
    padding: 10,
    borderWidth: 5,
    marginBottom: 5
  }  

  if(!message) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
