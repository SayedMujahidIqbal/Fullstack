import { useDispatch, useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: '10px solid green',
    borderRadius: '10px',
    padding: 10,
    borderWidth: 5,
    marginBottm: 10
  }
  return (    
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification