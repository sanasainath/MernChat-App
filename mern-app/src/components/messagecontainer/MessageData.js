// import React, { useEffect, useRef } from 'react';
// import { animateScroll } from 'react-scroll';
// import Message from './Message';
// import useGetMessages from '../hooks/usegetMessages';
// import NoMessages from './NoMessages';
// import useHead from '../hooks/useHead';
// import useConversation from '../zustand/useConversation';
// import { useSocketContext } from '../../helpers/Socket';

// function MessageData() {
//   const { messages, loading } = useGetMessages();
//   const { Notifications } = useSocketContext();
//   const { selectedConversation } = useConversation();
//   const MsgContainerRef = useRef();
//   useHead();

//   useEffect(() => {
//     if (MsgContainerRef.current) {
//       animateScroll.scrollToBottom({
//         containerId: 'msgContainer',
//         duration: 0,
//       });
//     }
//   }, [messages, selectedConversation?._id]);

//   return (
//     <div
//       className='px-4 flex-1 overflow-y-auto overflow-x-hidden'
//       id="msgContainer"
//       ref={MsgContainerRef}
//       style={{ wordBreak: 'break-word' }} // Ensure long words are broken and wrapped
//     >
//       {/* Loading skeleton */}
//       {loading && [...Array(4)].map((_, ind) => (
//         <div className="flex flex-col gap-4 w-52" key={ind}>
//           <div className="flex gap-4 items-center">
//             <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
//             <div className="flex flex-col gap-4">
//               <div className="skeleton h-4 w-20"></div>
//               <div className="skeleton h-4 w-28"></div>
//             </div>
//           </div>
//           <div className="skeleton h-32 w-full"></div>
//         </div>
//       ))}

//       {/* No messages found */}
//       {!loading && (!messages || messages.length === 0) && <NoMessages />}

//       {/* Display messages */}
//       {!loading && messages && messages.length > 0 && (
//         <>
//           {messages.map((data, index) => (
//             <Message key={index} data={data} />
//           ))}
//         </>
//       )}
//     </div>
//   );
// }

// export default MessageData;


import React, { useEffect, useRef } from 'react';
import { animateScroll } from 'react-scroll';
import Message from './Message';
import useGetMessages from '../hooks/usegetMessages';
import NoMessages from './NoMessages';
import useHead from '../hooks/useHead';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../../helpers/Socket';

function MessageData() {
  const { messages, loading } = useGetMessages();
  const { Notifications } = useSocketContext();
  const { selectedConversation } = useConversation();
  const MsgContainerRef = useRef();
  useHead();

  useEffect(() => {
    if (MsgContainerRef.current) {
      animateScroll.scrollToBottom({
        containerId: 'msgContainer',
        duration: 0,
      });
    }
  }, [messages, selectedConversation?._id]);

  return (
    <div
      className='px-4 flex-1 overflow-y-auto overflow-x-hidden'
      id="msgContainer"
      ref={MsgContainerRef}
      style={{ wordBreak: 'break-word' }} // Ensure long words are broken and wrapped
    >
      {/* Loading skeleton */}
      {loading && [...Array(4)].map((_, ind) => (
        <div className="flex flex-col gap-4 w-52" key={ind}>
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      ))}

      {/* No messages found */}
      {!loading && (!messages || messages.length === 0) && <NoMessages />}

      {/* Display messages */}
      {!loading && messages && messages.length > 0 && (
        <>
          {messages.map((data, index) => (
            <Message key={index} data={data} />
          ))}
        </>
      )}
    </div>
  );
}

export default MessageData;
