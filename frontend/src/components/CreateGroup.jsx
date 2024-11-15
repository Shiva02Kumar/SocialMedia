import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux';

function CreateGroup() {
  const lightMode = useSelector((state) => state.themeKey);
    return (
        <div className='mainPanel'>
            <div className="createGroup">
                <div className='createGroupInputBox'>
                    <input type="text" name="createGroupInput" id="sendMessage" className={(lightMode? '' : " darkSearch")} placeholder='Enter Group Name' />
                    <FontAwesomeIcon icon={faCheck} className='mainPanelHeaderIcon' />
                </div>
            </div>
        </div>
    )
}

export default CreateGroup