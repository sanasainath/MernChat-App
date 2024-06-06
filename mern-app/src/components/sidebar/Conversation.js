import React from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../../helpers/Socket';

const Conversation = ({ user, lastIdx, lastSeenTime,toggleChatbox }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const online = onlineUsers.includes(user._id);
  const isSelected = selectedConversation?._id === user._id;

  let GenderEmoji = user.gender === "male" ? "👦" : "👩‍🦰";

  return (
    <>
      <div
  style={{ paddingBottom: '10px' }}
  className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500 ' : 'hover:bg-sky-500'}`}
  onClick={() => {
    setSelectedConversation(user);
    toggleChatbox(); // Call toggleChatbox function
  }}
>
        <div className={`avatar ${online ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            <img
              src={user.profileImage}
              alt='user avatar'
            />  
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <div className='flex flex-col'>
              <p className={`font-bold ${isSelected ? 'text-black-600' : 'text-gray-200'}`} style={{ paddingLeft: '15px', paddingBottom: '5px', fontWeight: 'lighter', fontSize: '18px' }}>{user.fullName}</p>
              {lastSeenTime ? (
                <p style={{ color: 'gray', paddingLeft: '20px', fontWeight: 'bold', fontSize: '14px' }}> last seen: {lastSeenTime}</p>
              ) : (
                <p style={{ color: 'gray', paddingLeft: '20px', fontWeight: 'bold', fontSize: '14px' }}> last seen: N/A</p>
              )}
            </div>
            <span className='text-xl'>{GenderEmoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation;
