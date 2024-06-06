import { useEffect, useState } from 'react';
import {backendUrl} from '../../helpers/axios';
import useConversation from '../zustand/useConversation';

function useGetMessages() {
    const [loading, setLoading] = useState(false);
       
    const { selectedConversation ,messages, setMessages} = useConversation();
    // console.log("chiclalalllallalalalalla",selectedConversation);
   

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const tokenauth = localStorage.getItem('tokenauth');
                const cleanToken = tokenauth.slice(1, -1); // Remove the first and last character (quotes)
                // console.log("token is getting man", cleanToken);
                const response = await backendUrl.get(`${selectedConversation._id}`, {
                    headers: {
                        Authorization: cleanToken
                    }
                });
                // console.log("it matters",response);
                setMessages(response.data.messages); // Assuming response.data is an array of messages
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) {
            fetchMessages();
        }
    }, [selectedConversation?._id,setMessages]); // Fetch messages when selectedConversation changes

    return { loading, messages };
}

export default useGetMessages;
