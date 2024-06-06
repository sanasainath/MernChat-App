import React, { useState, useEffect } from 'react';
import UserDataFetch from './UserDataFetch';
import Logout from './Logout';

function LeftSideChat({ toggleChatbox }) {
  const [height, setHeight] = useState(window.innerWidth <= 765 ? 600 : 'auto');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 765) {
        setHeight(600);
      } else {
        setHeight('auto');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='left-side-chat md:max-sm:flex border-r border-slate-500 p-1 md:p-6 flex flex-col h-full' style={{ height: height }}>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <UserDataFetch toggleChatbox={toggleChatbox} /> {/* Pass toggleChatbox prop */}
      </div>
      <div className="sticky bottom-0">
        <Logout />
      </div>
    </div>
  );
}

export default LeftSideChat;
