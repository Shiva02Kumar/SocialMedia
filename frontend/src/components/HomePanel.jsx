import { faIcons } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function HomePanel() {
    return (
        <div className='mainPanel'>
            <div className='homePanelArea'>
                <FontAwesomeIcon icon={faIcons} className='homePanelIcon' />
                <h1>The best way to connect is to start a conversation.</h1>
            </div>
        </div>
    )
}

export default HomePanel