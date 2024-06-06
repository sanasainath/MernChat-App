import { useEffect } from "react";
import { useSocketContext } from "../../../helpers/Socket";
import useGroupConversation from "../../zustand/useGroupConversation";
import sound from '..//../sound/achive-sound-132273.mp3';
const useAtLast = () => {
    const { socket } = useSocketContext();
    const { GroupMessages, setGroupMessages } = useGroupConversation();
    console.log("checking using socket",GroupMessages);

   
    useEffect(() => {
        // Inside your client-side code (e.g., React component)
// Listen for new group messages
socket.on('newGroupMessage', (message) => {
    // Update your chat interface to display the new message
    
    setGroupMessages([...GroupMessages, message]);
    // You can add the message to your chat history, display it in real-time, etc.
  });
  
        
        
        
      
    }, [socket, setGroupMessages, GroupMessages]);

    // It's good practice to return something from custom hooks, even if it's null in this case
    return null;
};

export default useAtLast;
