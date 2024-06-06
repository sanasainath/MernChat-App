import {jwtDecode} from 'jwt-decode';
import React from 'react';
import useConversation from '../zustand/useConversation'
import { useSocketContext } from '../../helpers/Socket';
function NoChat() {
  const {socket,Notifications,setNotifications}=useSocketContext();
  const token = localStorage.getItem("tokenauth");
  let fullName = "";
  if (token) {
    const decoded = jwtDecode(token);
    // console.log("this is current logged user id ",decoded.userId);
    fullName = decoded.fullName;
  }

  const {selectedConversation}=useConversation();
  // console.log("cehckkckc",selectedConversation);
  socket?.on("newMessage", (newMessage) => {
    // console.log("cehckkckc",selectedConversation);
    // console.log("no conversation opened", newMessage);
  // Add null check for selectedConversation and _id
      if (!selectedConversation) {
        if (!Notifications.some(notification => notification.senderId === newMessage.senderId)) {
          setNotifications([...Notifications, newMessage]);
      }
      }
      
    
  });
  
 

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {fullName ? (
        <>
          <h2 className="text-xl font-bold text-green-300 mb-3">Welcome to Chat {fullName}</h2>
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </>
      ) : (
        <p className="text-gray-500">Please log in to start chatting</p>
      )}
    </div>
  );
};

export default NoChat;
