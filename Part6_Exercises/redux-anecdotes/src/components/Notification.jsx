import { useDispatch, useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: '10px solid green',
    padding: 10,
    borderWidth: 1
  }
  return (    
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification