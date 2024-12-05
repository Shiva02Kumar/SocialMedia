import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SentByOthers({ message, showIcon, sameUser }) {
    return (
        <div className='sentByOthers' style={{ marginTop: sameUser ? 3 : 10 }}>
            {showIcon ? <div className='othersPic'>
                <FontAwesomeIcon icon={faUser} className='mainPanelHeaderIcon' />
            </div> :
                <div className='othersPic'>
                    <p></p>
                </div>
            }
            <div className='othersInfo'>
                {message.chat.isGroupChat ? <h4>User Name</h4> : null}
                <p>{message.content}</p>
                <p className='messageTime'>{new Date(message.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}</p>
            </div>
        </div>
    )
}

export default SentByOthers