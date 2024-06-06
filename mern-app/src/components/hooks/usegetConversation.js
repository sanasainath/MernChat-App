import { useState, useEffect } from 'react';
import { backendUrl } from '../../helpers/axios';

function useGetConversation() {
  const [sidebarUsers, setSidebarUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  // const [groups, setGroups] = useState([]);
  

  useEffect(() => {
    // Fetch sidebar users only if shouldFetch is true
    if (shouldFetch) {
      const fetchSidebarUsers = async () => {
        setLoading(true); 
        try {
          const tokenauth = localStorage.getItem('tokenauth');
          const cleanToken = tokenauth.slice(1, -1); // Remove the first and last character (quotes)
          // console.log("token is getting man", cleanToken);
          
          // Make a GET request to the backend endpoint to fetch sidebar users
          const response = await backendUrl.get('/sidebar/users', {
            headers: {
              Authorization: cleanToken // Correctly interpolate tokenauth variable
            }
          });
          // const groupsResponse = await backendUrl.get('/get/groups', {
          //   headers: {
          //     Authorization: cleanToken
          //   }
          // });
        
          // setGroups(groupsResponse.data);
  
          // Set the fetched sidebar users in state
          setSidebarUsers(response.data);
        } catch (error) {
          console.error('Error fetching sidebar users:', error);
        } finally {
          setLoading(false);
        }
      };
  
      // Call the fetchSidebarUsers function
      fetchSidebarUsers();
  
      // Reset shouldFetch to false to prevent unnecessary re-fetching
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  // Return sidebarUsers and loading state so components can access them
  return { sidebarUsers, loading };
}

export default useGetConversation;
