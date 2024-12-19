import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

function Conversation({ onClick, ifSearch, isGroupChat, chatName, users, latestMessage, name }) {
    const user = useSelector((state) => state.userKey);
    let latestContent = latestMessage ? latestMessage.content : 'No messages yet';

    const formatMessageTime = (dateString) => {
        const messageDate = new Date(dateString);
        const now = new Date();

        const isSameDay = (date1, date2) =>
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();

        if (isSameDay(messageDate, now)) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
        }

        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        if (isSameDay(messageDate, yesterday)) {
            return "Yesterday";
        }

        if (messageDate.getFullYear() === now.getFullYear()) {
            return messageDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        }

        return messageDate.toLocaleDateString('en-GB');
    }

    const formattedTime = latestMessage ? formatMessageTime(latestMessage.updatedAt) : '';

    const chatDisplayName = () => {
        if (ifSearch) {
            latestContent = ''
            return name;
        }
        if (isGroupChat) {
            return chatName;
        }

        if (users && users.length > 1) {
            return user._id === users[0]._id ? users[1].name : users[0].name;
        }

        return "Unknown Chat";
    };

    return (

        <div className='Conversation' onClick={onClick}>
            <div className='conProfile'>
                <FontAwesomeIcon icon={faUser} className='sidePanelHeaderIcon' />
            </div>
            <div className='conversationInfo'>
                <div className="conversationHeader">
                    <h3>{chatDisplayName()}</h3>
                    <p className='conTime'>{formattedTime}</p>
                </div>
                <p className='conMessage'>
                    {latestContent.length > 30 ? `${latestContent.slice(0, 30)}...` : latestContent}
                </p>
            </div>
        </div>
    )
}

export default Conversation