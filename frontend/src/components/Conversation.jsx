import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Conversation(props) {
    console.log(props.name);

    function formatMessageTime(dateString) {
        const messageDate = new Date(dateString);
        const now = new Date();

        // Check if the message is from today
        const isToday =
            messageDate.getDate() === now.getDate() &&
            messageDate.getMonth() === now.getMonth() &&
            messageDate.getFullYear() === now.getFullYear();

        if (isToday) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Check if the message is from yesterday
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        const isYesterday =
            messageDate.getDate() === yesterday.getDate() &&
            messageDate.getMonth() === yesterday.getMonth() &&
            messageDate.getFullYear() === yesterday.getFullYear();

        if (isYesterday) {
            return "Yesterday";
        }

        // Check if the message is from the current year
        const isThisYear = messageDate.getFullYear() === now.getFullYear();

        if (isThisYear) {
            return messageDate.toLocaleDateString([], { day: '2-digit', month: 'short' });
        }

        // Otherwise, return the month and year
        return messageDate.toLocaleDateString([], { month: 'short', year: 'numeric' });
    }

    return (
        <div className='Conversation'>
            <div className='conProfile'>
                <FontAwesomeIcon icon={faUser} className='sidePanelHeaderIcon' />
            </div>
            <div className='conversationInfo'>
                <div className="conversationMessage">
                    <h3>{props.name}</h3>
                    <p className='conTime'>{formatMessageTime(props.time)}</p>
                </div>
                {/* <p className='conMessage'>{props.message.length > 30 ? props.message.slice(0, 30) + '...' : props.message}</p> */}
                <p className='conMessage'>{props.message}</p>

            </div>
        </div>
    )
}

export default Conversation