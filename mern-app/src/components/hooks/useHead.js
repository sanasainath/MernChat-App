import React, { useEffect } from 'react';
import { useSocketContext } from '../../helpers/Socket';
import useConversation from '../zustand/useConversation';
import sound from '../sound/achive-sound-132273.mp3'
const useHead = () => {
    const { socket,Notifications,setNotifications } = useSocketContext();
    const { messages, setMessages,selectedConversation } = useConversation();
    // console.log("selciton idddddddd",selectedConversation._id);

    useEffect(() => {
        if (messages && Array.isArray(messages)) {
            socket?.on("newMessage", (newMessage) => {
                console.log("new message abhhhhhhhhh",newMessage);
                newMessage.shouldShake=true;
                const audio = new Audio(sound);
                audio.play();
                if(selectedConversation._id !== newMessage.senderId)

                {
                    if (!Notifications.some(notification => notification.senderId === newMessage.senderId)) {
                        setNotifications([...Notifications, newMessage]);
                    }
                    
                    
                    
                        
                     
                    
                    console.log("check now notificationssssssssssssssssssssssssss",Notifications);
                   
                }
                else
                {
                    setMessages([...messages, newMessage]);
                }
                
            });
         
        }
        
        return () => {
            socket?.off("newMessage");
        };
    }, [socket, setMessages, messages,setNotifications,Notifications]);

}

export default useHead;
