import { useEffect, useState } from "react";
import { backendUrl } from "../../../helpers/axios";
import { useSocketContext } from "../../../helpers/Socket";


function useGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const {socket}=useSocketContext();
  socket.on('newGroupCreated',(group)=>{
    setGroups([...groups,group])
  })

 

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const tokenauth = localStorage.getItem('tokenauth');
        const cleanToken = tokenauth.slice(1, -1);

        const response = await backendUrl.get('/get/groups', {
          headers: {
            Authorization: cleanToken
          }
        });
        console.log("checking group response00",response);

        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return { groups, loading };
}

export default useGroups;
