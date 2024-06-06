import { useEffect, useState } from 'react';
import useGroupConversation from '../../zustand/useGroupConversation';
import { backendUrl } from '../../../helpers/axios';

const useGroupMembers = () => {
    const [groupMembers, setGroupMembers] = useState([]);
    const { selectedGroupConversation } = useGroupConversation();

    useEffect(() => {
        const fetchGroupMembers = async () => {
            try {
                // Make an API call to fetch group members
                const response = await backendUrl.get(`/get/members/group/${selectedGroupConversation}`);
                
                if (response.status !== 200) {
                    throw new Error('Failed to fetch group members');
                }

                const data = response.data; // Assuming the response structure has a 'members' property
                console.log("first check response", data);
                setGroupMembers(data); // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching group members:', error);
            }
        };
       if(selectedGroupConversation)
       {
        fetchGroupMembers();
       }
        

        // Cleanup function (optional)
        return () => {
            // Cleanup code here (if any)
        };
    }, [selectedGroupConversation]); // Include selectedGroupConversation in the dependency array

    return groupMembers;
};

export default useGroupMembers;
