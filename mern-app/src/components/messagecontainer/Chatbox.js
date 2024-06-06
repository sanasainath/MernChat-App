import React, { useEffect, useCallback, useState } from 'react';
import MessageData from './MessageData';
import SearchInput from './SearchInput';
import useConversation from '../zustand/useConversation';
import NoChat from './NoChat';
import NoMessages from './NoMessages';
import { useSocketContext } from '../../helpers/Socket';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import useGetMessages from '../hooks/usegetMessages';

function Chatbox() {
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const navigate = useNavigate();
  const { messages } = useGetMessages();
  
  const [lastSeenTime, setLastSeenTime] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 765);
  const [isScreen, setIsScreen] = useState(window.innerWidth <= 1066);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 765;
      setIsSmallScreen(isSmall);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 765;
      setIsSmallScreen(isSmall);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isSmallerScreen = window.innerWidth <= 1066;
      setIsScreen(isSmallerScreen);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let email = '';
  let room = '';

  if (selectedConversation) {
    const tokenauth = localStorage.getItem('tokenauth');
    if (tokenauth) {
      const decoded = jwtDecode(tokenauth);
      email = decoded.email;
      room = `${decoded.userId}-${selectedConversation._id}`;
      
      room = room.split('-').sort().join('-');
    }
  }

  const handleClick = () => {
   console.log("checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    if (room && email) {
      socket.emit('JoinRooms', { email, room });
    } else {
      console.error('Room ID or email not found.');
    }
  };

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (socket) {
      socket.on("JoinRooms", handleJoinRoom);
      return () => {
        socket.off("JoinRooms", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      const lastMessageTimestamp = messages[messages.length - 1].timestamp;
      const formattedLastSeenTime = new Date(lastMessageTimestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setLastSeenTime(formattedLastSeenTime);
    }
  }, [messages]);

  return (
    <div className={`flex flex-col ${isSmallScreen ? 'h-[460px]' : 'min-w-[450px]'} overflow-x-hidden`} style={{overflowX:'hidden',overflowY:'hidden'}} >
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <>
          <div className={`flex ${isSmallScreen ? 'flex-row items-center' : 'flex-col md:flex-row'} bg-gray-600 px-2 py-2 mb-2`} style={{ height: isSmallScreen ? '70px' : 'auto',padding:isSmallScreen?'5px':'20px' }}>
            <div className='w-12 h-12 rounded-full overflow-hidden md:mr-4'>
              <img 
                src={selectedConversation.profileImage}
                alt='user avatar'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex flex-row  md:flex-row md:items-center'>
              <div className='text-center md:text-left md:mr-6' style={{fontSize:isSmallScreen?'14px':'20px',paddingLeft:isSmallScreen?'15px':'10px',paddingTop:isSmallScreen?'0px':'0px'}}>
                <span className='text-teal-500 text-xl font-bold'  style={{fontSize:isSmallScreen?'20px':'30px'}} >{selectedConversation.fullName}</span>
                <h2  className='text-gray-600 font-bold' style={{color:'red',fontSize:isSmallScreen?'10px':'10px',paddingTop:'4px'}}>Last seen: {lastSeenTime}</h2>
              </div>

              <h2 className='md:ml-auto cursor-pointer'style={{paddingLeft:isSmallScreen?'30px':'80px'}} onClick={handleClick}>🎥</h2>
            </div>
          </div>
          <MessageData />
          <SearchInput />
        </>
      )}
    </div>
  );
}

export default Chatbox;
