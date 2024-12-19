import { faPaperPlane, faSpinner, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { React, useEffect, useState } from 'react'
import SentByMe from './SentByMe'
import SentByOthers from './SentByOthers'
import { useSelector } from 'react-redux'
import { formatMessageTime } from '../utils/miscellaneous'

function MainPanel() {
  const [Messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setloading] = useState(false);
  const selectedChat = useSelector((state) => state.selectedChatKey);
  const user = useSelector((state) => state.userKey);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  }

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      try {
        setloading(true)
        const response = await fetch(`/messages/${selectedChat._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const result = await response.json()
        console.log(result);

        if (result.success) {
          console.log(result)
          setMessages(result.data)
        }
        setloading(false)
      } catch (error) {

      }
      finally {
        setloading(false);
      }
    }

    fetchMessages()
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const response = await fetch('/messages/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newMessage,
            chatID: selectedChat._id
          }),
          credentials: 'include',
        });
        console.log(selectedChat);
        console.log(newMessage);
        const result = await response.json()
        console.log(result)
        if (result.success) {
          setMessages([...Messages, result.data])
        }

      } catch (error) {

      }
    }
  }

  const isSameSender = (m, i) => {
    return (
      i < Messages.length - 1 && (
        Messages[i + 1].sender._id !== m.sender._id ||
        Messages[i + 1].sender._id === undefined) &&
      Messages[i].sender._id !== user._id
    )
  }

  const isLastMessage = (m, i) => {
    return (
      i === Messages.length - 1 &&
      (Messages[Messages.length - 1].sender._id !== user._id ||
        Messages[Messages.length - 1].sender._id)
    )
  }

  const isSameUser = (m, i) => {
    return i > 0 && Messages[i - 1].sender._id === m.sender._id;
  }

  const isNewDate = (m, i) => {
    const currentDate = new Date(m.createdAt).toDateString();
    const previousDate = Messages[i - 1] ? new Date(Messages[i - 1].createdAt).toDateString() : null;
    return currentDate !== previousDate;
  };

  return (
    <div className='mainPanel'>
      <div className="mainPanelHeader">
        <div className='chatProfile'>
          <FontAwesomeIcon icon={faUser} className='mainPanelHeaderIcon' />
        </div>
        <div className='mainPanelProfileInfo'>
          <div>
            <h2>{selectedChat.isGroupChat ? selectedChat.chatName : (user._id === selectedChat.users[0]._id ? selectedChat.users[1].name : selectedChat.users[0].name)}</h2>
            <p>Online</p>
          </div>
          <FontAwesomeIcon icon={faTrash} className='mainPanelHeaderIcon' />
        </div>
      </div>
      <div className='mainPanelChatArea'>
        {loading ? (
          <div className="loadingSpinner">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          </div>
        ) : Messages.length > 0 ? (
          Messages.map((msg, i) => {
            const showDateBanner = isNewDate(msg, i);
            return (
              <div key={msg._id}>
                {showDateBanner && (
                  <div className="dateBanner">
                    <span>{formatMessageTime(msg.createdAt)}</span>
                  </div>
                )}
                {msg.sender._id === user._id ? (
                  <SentByMe key={msg._id} message={msg} sameUser={isSameUser(msg, i)} />
                ) : (
                  <SentByOthers key={msg._id} message={msg} showIcon={isSameSender(msg, i) || isLastMessage(msg, i)} sameUser={isSameUser(msg, i)} />
                )}
              </div>
            );
          })
        ) : (
          <p className="emptyMessage">No messages yet. Start the conversation!</p>
        )}
      </div>
      <div className='mainPanelChatInput'>
        <input type="text" name="sendMessage" id="sendMessage" placeholder='Type a Message' onKeyDown={sendMessage} onChange={typingHandler} value={newMessage} />
        <FontAwesomeIcon icon={faPaperPlane} className='mainPanelHeaderIcon' />
      </div>
    </div>
  )
}

export default MainPanel