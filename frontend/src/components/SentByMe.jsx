import React from 'react'

function SentByMe({message, sameUser}) {
  return (
    <div className='sentByMe' style={{marginTop: sameUser? 3 : 10}}>
            <div className='myInfo'>
                <p>{message.content}</p>
                <p className='messageTime'>{new Date(message.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}</p>
            </div>
        </div>
  )
}

export default SentByMe