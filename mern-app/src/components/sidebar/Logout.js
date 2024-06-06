import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from '../../action/login';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useConversation from '../zustand/useConversation';
function Logout() {
  const { setSelectedConversation } = useConversation();
    // const {isLogout}=useSelector((state)=>state.logout);
    const navigate=useNavigate();
    // console.log("logout possible ",isLogout);
    const dispatch=useDispatch();


    const loggingOut=async()=>{
       await dispatch(LogOut());
       setSelectedConversation(null);
       navigate('/');
    }

    // useEffect(()=>{
    //     if(isLogout)
    //     {
    //         navigate('/');
    //     }
        

    // },[isLogout,navigate])
  return (
    <div>
       
      {/* <button style={{color:"red"}}type="button " onClick={loggingOut}/> */}

        <Button onClick={loggingOut} block className="bg-gray-500 text-white border-none hover:bg-gray-600">LoginOut</Button>
    </div>
  )
}

export default Logout
