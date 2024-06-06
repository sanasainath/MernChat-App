
import React from 'react';
// import useGroupConversation from '../../zustand/useGroupConversation';
import { jwtDecode } from 'jwt-decode'; // Correct import statement

function Messages({ data }) {
  // const { selectedGroupConversation } = useGroupConversation();
  const tokenauth = localStorage.getItem('tokenauth');
  // console.log("dataattatatatatattatata",data);

  let decoded = {};
  if (tokenauth) {
    decoded = jwtDecode(tokenauth);
  } else {
    console.log("Token not found.");
  }
  // console.log("checking user idddddddddd",decoded.userId);

  // Check if data and data.sender are defined before accessing properties
  const isSentByCurrentUser = data && data.sender && data.sender.id === decoded.userId;
  const chatSideClass = isSentByCurrentUser ? 'chat-end' : 'chat-start';

  const backgroundColor = isSentByCurrentUser ? 'bg-blue-500' : '';
  const shakeClass = data && data.shouldShake ? 'shake' : ''; // Add the shake class if shouldShake is true

  let messageTime = '';
  if (data && data.createdAt) {
    messageTime = new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className={`chat ${chatSideClass}`}>
      <div className='chat-image avatar'>
        {/* <div className='w-10 rounded-full'>
          <img
            alt='Avatar'
            src={profileImage}
          />
        </div> */}
      </div>
      <div>
        <div className='text-white'>{isSentByCurrentUser ? 'You' : (data && data.sender && data.sender.name)}</div>
        <div className={`chat-bubble ${backgroundColor} ${shakeClass}`}>
          <div className="chat-content whitespace-normal">{data && data.message}</div>
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-400">
          {messageTime} {/* Always render timestamp */}
        </div>
      </div>
    </div>
  );
  
  
}

export default Messages;

