import { React, useEffect, useRef, useState } from 'react'
// import { ChatState } from '../contexts/ChatProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faEllipsisVertical, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Conversation from './Conversation';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function SidePanel() {
  // const { user } = ChatState();
  const [conversations] = useState([
    {
      id: 1,
      name: "Alice",
      message: "Hello! How are you?",
      time: "2024-11-07T08:15:30Z"
    },
    {
      id: 2,
      name: "Bob",
      message: "I'm doing well, thanks! How about you?",
      time: "2024-11-07T08:16:45Z"
    },
    {
      id: 3,
      name: "Charlie",
      message: "Just finished a project, feeling accomplished!",
      time: "2024-11-07T08:18:00Z"
    },
    {
      id: 4,
      name: "David",
      message: "That's awesome! Want to catch up later?",
      time: "2024-11-07T08:20:15Z"
    },
    {
      id: 5,
      name: "Eve",
      message: "Sure, let me know a time that works!",
      time: "2024-11-07T08:21:30Z"
    },
    {
      id: 6,
      name: "Frank",
      message: "How about 5 PM?",
      time: "2024-11-07T08:23:00Z"
    },
    {
      id: 7,
      name: "Grace",
      message: "5 PM works perfectly. See you then!",
      time: "2024-11-07T08:23:45Z"
    }
  ]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const lightMode = useSelector((state) => state.themeKey);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
  };

  return (
    <div className='sidePanel'>
      <div className="sidePanelHeader">
        <div>
          <h1>Messages</h1>
        </div>
        <div>
          <FontAwesomeIcon icon={faPlus} className='sidePanelHeaderIcon' onClick={() => { navigate('/CreateGroup'); }} />
          <div className="dropdownContainer" ref={dropdownRef}>
            <FontAwesomeIcon icon={faEllipsisVertical} className='sidePanelHeaderIcon' onClick={() => { setDropdownVisible(!dropdownVisible); }} />
            {dropdownVisible && (
              <div className="dropdownMenu">
                <div className="dropdownItem" onClick={handleProfileClick}>
                  <FontAwesomeIcon icon={faUser} className='dropdownIcon' />
                  <p className='dropdownText'>Profile</p>
                </div>
                <div className="dropdownItem" onClick={handleLogoutClick}>
                  <FontAwesomeIcon icon={faRightFromBracket} className='dropdownIcon' />
                  <p className='dropdownText'>Log Out</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sidePanelSearch">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="sidePanelHeaderIcon" />
        <input type="text" name="search" id="searchBox" className={(lightMode? '' : " darkSearch")} placeholder='Search' />
      </div>
      <div className="sidePanelConversations">
        {conversations.map((ConversationInfo) => {
          return <Conversation key={ConversationInfo.id} {...ConversationInfo} />
        })}
      </div>
    </div>
  )
}

export default SidePanel