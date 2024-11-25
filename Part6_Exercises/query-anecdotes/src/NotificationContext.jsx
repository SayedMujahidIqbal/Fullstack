import { createContext, useContext, useReducer } from "react"; 

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "NEW_ANECDOTE_ADDED":
            return action.payload
        case "VOTE_ANECDOTE":
            return action.payload
        case "INVALID_ANECDOTE": 
            return action.payload
        case "CLEAR_NOTIFICATION":
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationMessage = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[ message, messageDispatch ]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext