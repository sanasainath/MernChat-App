import { useState } from 'react';
import { backendUrl } from '../../helpers/axios';
import useConversation from '../zustand/useConversation';

import { useSocketContext } from '../../helpers/Socket';

function useSendMessages() {
    const [loading, setLoading] = useState(false);
    const{socket}=useSocketContext();
    const { selectedConversation, messages, setMessages } = useConversation();
//    console.log("normal messgaes",messages);
    const sendMessage = async (message) => {
        try {
            setLoading(true);
            const tokenauth = localStorage.getItem('tokenauth');
            const cleanToken = tokenauth.slice(1, -1); // Remove the first and last character (quotes)
             socket.emit('stop typing',{userId:selectedConversation._id});
            const response = await backendUrl.post(`/send/${selectedConversation._id}`, { message }, {
                headers: {
                    Authorization: cleanToken
                }
            });
    // console.log("in send messageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",response);
            // Check if the response status is successful (status code within the range of 200-299)
            if (response.status >= 200 && response.status < 300) {
                // Extract the new message from the response data
                const newMessage = response.data.newMessage;
    // console.log("mininining",newMessage);
                // Update messages with the new message
                
                setMessages([...messages, newMessage]);
            } else {
                // Handle HTTP error responses
                console.error('Failed to send message:', response.statusText);
                throw new Error(`Failed to send message: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            throw error; // Re-throw the error for the caller to handle
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
}

export default useSendMessages;
