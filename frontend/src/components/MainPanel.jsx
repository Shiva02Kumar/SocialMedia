import { faPaperPlane, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import SentByMe from './SentByMe'
import SentByOthers from './SentByOthers'

function MainPanel() {
  return (
    <div className='mainPanel'>
      <div className="mainPanelHeader">
        <div className='chatProfile'>
          <FontAwesomeIcon icon={faUser} className='mainPanelHeaderIcon' />
        </div>
        <div className='mainPanelProfileInfo'>
          <div>
            <h2>Chat Name</h2>
            <p>Online</p>
          </div>
          <FontAwesomeIcon icon={faTrash} className='mainPanelHeaderIcon' />
        </div>
      </div>
      <div className='mainPanelChatArea'>
        <SentByOthers />
        <SentByMe />
        <SentByOthers />
        <SentByMe />
        <SentByOthers />
        <SentByMe />
        <SentByOthers />
        <SentByMe />
        <SentByOthers />
        <SentByMe />
      </div>
      <div className='mainPanelChatInput'>
        <input type="text" name="sendMessage" id="sendMessage" placeholder='Type a Message' />
        <FontAwesomeIcon icon={faPaperPlane} className='mainPanelHeaderIcon' />
      </div>
    </div>
  )
}

export default MainPanel