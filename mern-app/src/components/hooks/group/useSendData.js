import { useState } from 'react';
import useGroupConversation from '../../zustand/useGroupConversation';
import { backendUrl } from '../../../helpers/axios';

function useSendData() {
    const [loading, setLoading] = useState(false);
    const { selectedGroupConversation, setGroupMessages, GroupMessages } = useGroupConversation();
    
    const sendGroupData = async (message) => {
        try {
            setLoading(true);
            const tokenauth = localStorage.getItem('tokenauth');
            const cleanToken = tokenauth.slice(1, -1);

            const response = await backendUrl.post('/add/group/message', {
                group: selectedGroupConversation,
                message: message
            }, {
                headers: {
                    'Authorization': cleanToken,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status >= 200 && response.status < 300) {
                const newMessage = response.data;
                // Update GroupMessages with new message
                setGroupMessages( [...GroupMessages, newMessage]);
            } else {
                console.error('Failed to send message:', response.statusText);
                throw new Error(`Failed to send message: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendGroupData };
}

export default useSendData;
