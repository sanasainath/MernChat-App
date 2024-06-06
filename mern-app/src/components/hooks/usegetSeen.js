import { useState, useEffect } from 'react';
import { backendUrl } from '../../helpers/axios';
function useGetSeen() {
  const [sidebarSeen, setSidebarSeen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  // const [groups, setGroups] = useState([]);
  

  useEffect(() => {
    // Fetch sidebar users only if shouldFetch is true
    if (shouldFetch) {
      const fetchSidebarLastSeen= async () => {
        setLoading(true); 
        try {
          const tokenauth = localStorage.getItem('tokenauth');
          const cleanToken = tokenauth.slice(1, -1); // Remove the first and last character (quotes)
          // console.log("token is getting man", cleanToken);
          
          // Make a GET request to the backend endpoint to fetch sidebar users
          const response = await backendUrl.get('/lastseen/users', {
            headers: {
              Authorization: cleanToken // Correctly interpolate tokenauth variable
            }
          });
          console.log("checking last seen response man",response.data);
          // const groupsResponse = await backendUrl.get('/get/groups', {
          //   headers: {
          //     Authorization: cleanToken
          //   }
          // });
        
          // setGroups(groupsResponse.data);
  
          // Set the fetched sidebar users in state
          setSidebarSeen(response.data);
        } catch (error) {
          console.error('Error fetching sidebar users:', error);
        } finally {
          setLoading(false);
        }
      };
  
      // Call the fetchSidebarUsers function
      fetchSidebarLastSeen();
  
      // Reset shouldFetch to false to prevent unnecessary re-fetching
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  // Return sidebarUsers and loading state so components can access them
  return { sidebarSeen, loading };
}

export default useGetSeen;
