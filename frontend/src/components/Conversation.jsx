import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { formatMessageTime } from '../utils/miscellaneous';

function Conversation({ onClick, ifSearch, isGroupChat, chatName, users, latestMessage, name }) {
    const user = useSelector((state) => state.userKey);
    let latestContent = latestMessage ? latestMessage.content : 'No messages yet';
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