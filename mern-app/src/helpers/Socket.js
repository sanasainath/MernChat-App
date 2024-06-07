import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client'
// Create the Socket context
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import useGroupMembers from '../components/hooks/group/useGroupMembers';

export const SocketContext = createContext();
export const useSocketContext=()=>{
  return useContext(SocketContext);
}

// Create the SocketContextProvider component
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [Notifications,setNotifications]=useState([]);
  
  const [onlineUsers, setOnlineUsers] = useState([]);
  const tokenauth = localStorage.getItem('tokenauth');
  const { isLogout } = useSelector((state) => state.logout);
//   console.log("checking token in socket context",tokenauth);

  useEffect(() => {
      if (tokenauth) {
          const decoded = jwtDecode(tokenauth);
        //   console.log("decooded token",decoded);
          const socket = io("https://mernchat-app-111.onrender.com", {
              query: {
                  userId: decoded.userId,
              }
          });
          setSocket(socket);
          socket.on("getOnlineUsers", (users) => {
              setOnlineUsers(users);
          });
          return () => socket.close();
      } else {
          if (socket) {
              socket.close();
              setSocket(null);
          }
      }

  }, [isLogout, tokenauth]);

  return (
      <SocketContext.Provider value={{ socket, onlineUsers,Notifications,setNotifications }}>
          {children}
      </SocketContext.Provider>
  );
};
