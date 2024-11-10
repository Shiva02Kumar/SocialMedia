import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function CreateGroup() {
    return (
        <div className='mainPanel'>
            <div className="createGroup">
                <div className='createGroupInputBox'>
                    <input type="text" name="createGroupInput" id="sendMessage" placeholder='Enter Group Name' />
                    <FontAwesomeIcon icon={faPaperPlane} className='mainPanelHeaderIcon' />
                </div>
            </div>
        </div>
    )
}

export default CreateGroup