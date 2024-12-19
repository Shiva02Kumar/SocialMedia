import { React, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faEllipsisVertical, faUser, faRightFromBracket, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Conversation from './Conversation';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { handleError } from '../utils/ToastHandle';
import { setSelectedChat } from '../utils/store';

function SidePanel() {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ifSearch, setIfSearch] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const lightMode = useSelector((state) => state.themeKey);
  const dropdownRef = useRef(null);
  const debounceTimeout = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    userChatsData();

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

  const userChatsData = async () => {
    const response = await fetch('/chats/userChats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const result = await response.json();
    if (result.success) {
      setUserChats(result.data);
    } else {
      console.error('Failed to fetch chats:', result.message);
    }
  }

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
  };

  const searchUsers = async (e) => {
    const query = e.target.value;
    setLoading(true)
    setIfSearch(true)
    if (!query) {
      setIfSearch(false)
      setSearchedUsers([]);
      setLoading(false)
      return;
    }
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      try {
        setLoading(true)
        const response = await fetch(`/auth/user?search=${encodeURIComponent(query)}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const result = await response.json();

        if (result.success) {
          setSearchedUsers(result.data);
          setLoading(false)

        } else {
          handleError(result.message);
          setSearchedUsers([]);
          setLoading(false)
        }
      } catch (error) {
        console.error('Error searching users:', error);
        handleError(error);
        setSearchedUsers([]);
        setLoading(false)
      }
    }, 500);
  }

  const handleConversationClick = async (userID) => {
    try {
      const response = await fetch('/chats/userChats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userID }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Chat data:', data.data);
        dispatch(setSelectedChat(data.data));
        userChatsData();
      } else {
        console.error('Failed to access chat:', data.message);
      }
    } catch (error) {
      console.error('Error accessing chat:', error);
    }
  };
  
  const handleOpenChat = (chatInfo) => {
    dispatch(setSelectedChat(chatInfo));
    navigate('/chats')
  }

  const renderConversations = () => {
    const data = ifSearch ? searchedUsers : userChats;

    if (loading) {
      return <div className="loadingSpinner"><FontAwesomeIcon icon={faSpinner} spinPulse /></div>;
    }
    if (!data || data.length === 0) {
      return <h2>No Chats Found</h2>;
    }
    return data.map((info) => (
      <Conversation
        key={info._id}
        {...info}
        onClick={() => ifSearch ? handleConversationClick(info._id) : handleOpenChat(info)}
        ifSearch={ifSearch}
      />
    ));
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
              <div className={`dropdownMenu ${dropdownVisible ? "show" : ""}`}>
                <div className="dropdownItem" onClick={handleProfileClick}>
                  <FontAwesomeIcon icon={faUser} className='dropdownIcon' />
                  <p className='dropdownText'>Profile</p>
                </div>
                <div className="dropdownItem" onClick={handleLogoutClick}>
                  <FontAwesomeIcon icon={faRightFromBracket} className='dropdownIcon' />
                  <p className='dropdownText'>Log Out</p>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="sidePanelSearch">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="sidePanelHeaderIcon" />
        <input type="text" name="search" id="searchBox" className={(lightMode ? '' : " darkSearch")} placeholder='Search' onChange={(e) => searchUsers(e)} />
      </div>
      <div className="sidePanelConversations">
        {renderConversations()}
      </div>
    </div>
  )
}

export default SidePanel