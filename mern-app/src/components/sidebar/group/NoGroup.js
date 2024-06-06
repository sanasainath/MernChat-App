// import React from 'react'
// import useGetGroupMessages from '../../hooks/group/usegetGroupMessages'
// import useGroupMembers from '../../hooks/group/useGroupMembers'


// const NoGroup = () => {
 
 
//   return (
//     <div>
//          <h2 className="text-xl font-bold text-green-300 mb-3">Welcome to Group</h2>
//           <p className="text-gray-500">Select a Group conversation to start chatting</p>
//     </div>
//   )
// }

// export default NoGroup
import {jwtDecode} from 'jwt-decode';
import React from 'react';

function NoGroup() {
  const token = localStorage.getItem("tokenauth");
  let fullName = "";
  if (token) {
    const decoded = jwtDecode(token);
    fullName = decoded.fullName;
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {fullName ? (
        <>
          <h2 className="text-xl font-bold text-green-300 mb-3">Welcome to Group {fullName}</h2>
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </>
      ) : (
        <p className="text-gray-500">Please log in to start chatting</p>
      )}
    </div>
  );
};

export default NoGroup;
