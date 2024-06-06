import { useState } from 'react';
import { backendUrl } from '../../../helpers/axios';

function useCreate() {
  const [loading, setLoading] = useState(false);

  const createGroup = async (name, selectedUserIds) => {
    console.log("name is",name);
    console.log("idssss is",selectedUserIds);
    setLoading(true); 
    try {
      const tokenauth = localStorage.getItem('tokenauth');
      const cleanToken = tokenauth.slice(1, -1);

      // Make a POST request to the backend endpoint with the group name and selected user IDs in the request body
      const response = await backendUrl.post('/create/groups', { name, members: selectedUserIds }, {
        headers: {
          Authorization: cleanToken
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error; // Rethrow the error to handle it in the component
    } finally {
      setLoading(false);
    }
  };

  return { createGroup, loading };
}

export default useCreate;
