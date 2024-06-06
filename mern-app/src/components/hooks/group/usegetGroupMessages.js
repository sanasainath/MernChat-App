import { useEffect, useState } from 'react';
import { backendUrl } from '../../../helpers/axios';
import useGroupConversation from '../../zustand/useGroupConversation';

function useGetGroupMessages() {
    const [loading, setLoading] = useState(false);
    const { selectedGroupConversation, GroupMessages, setGroupMessages } = useGroupConversation(); // Import setSelectedGroupConversation
    
    
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                
                // console.log("selecting group conversation", selectedGroupConversation);
                const response = await backendUrl.get(`/data/retrieve/${selectedGroupConversation}`);

                // console.log("Response checking", response.data);
                setGroupMessages(response.data); // Changed setMessages to setGroupMessages
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedGroupConversation) { // Ensure selectedGroupConversation exists before fetching messages
            fetchMessages();
        }
     
    }, [selectedGroupConversation, setGroupMessages]); // Added lastClicked as a dependency



    return { loading, GroupMessages };
}

export default useGetGroupMessages;
