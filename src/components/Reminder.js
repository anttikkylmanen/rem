import React from 'react'
//import App from '../App'

const Reminder = ({reminder, del}) => {
    return (
            <li>{reminder.timestamp}  {reminder.name} <button onClick={del}>Delete</button></li>
        
    )
}

export default Reminder