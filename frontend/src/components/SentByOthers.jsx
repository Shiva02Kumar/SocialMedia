import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SentByOthers() {
    return (
        <div className='sentByOthers'>
            <div className='othersPic'>
                <FontAwesomeIcon icon={faUser} className='mainPanelHeaderIcon' />
            </div>
            <div className='othersInfo'>
                <h4>User Name</h4>
                <p>Sample Message</p>
                <p className='messageTime'>Time</p>
            </div>
        </div>
    )
}

export default SentByOthers