import React from 'react';
import useConversation from '../zustand/useConversation';
import { jwtDecode } from 'jwt-decode'; // Correct import statement

function Message({ data }) {
  const { selectedConversation } = useConversation();
  const tokenauth = localStorage.getItem('tokenauth');

  let decoded = {};
  if (tokenauth) {
    decoded = jwtDecode(tokenauth);
  } else {
    console.log("Token not found.");
  }

  const isSentByCurrentUser = data.senderId === decoded.userId;
  const chatSideClass = isSentByCurrentUser ? 'chat-end' : 'chat-start';
  const profileImage = isSentByCurrentUser ? decoded.profileImage : selectedConversation.profileImage;
  const backgroundColor = isSentByCurrentUser ? 'bg-blue-500' : '';
  const shakeClass = data.shouldShake ? 'shake' : ''; // Add the shake class if shouldShake is true

  let messageTime = '';
  if (data.timestamp) {
    messageTime = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className={`chat ${chatSideClass}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt='Avatar'
            src={profileImage}
          />
        </div>
      </div>
      <div className={`chat-bubble ${backgroundColor} ${shakeClass}`}>{data.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-400">{messageTime}</div>
    </div>
  );
}

export default Message;
