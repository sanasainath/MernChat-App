  import React, { useState, useEffect, useRef } from 'react';
  import { BsSend } from 'react-icons/bs';
  import useSendMessages from '../hooks/useSendMessages';
  import useConversation from '../zustand/useConversation';
  import { useSocketContext } from '../../helpers/Socket';
  import Lottie from 'react-lottie';
  import typingfile from '../Typing/typing.json';
  import EmojiPicker from 'emoji-picker-react';
 

  const MessageInput = () => {
    const [typedMessage, setTypedMessage] = useState('');
    const { loading, sendMessage } = useSendMessages();
    const { selectedConversation, isInputActive } = useConversation();
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [addclickable,setaddclickable]=useState(false);
    const { socket } = useSocketContext();
    const inputRef = useRef(null);
    const msgContainerRef = useRef(null);
    const emojiPickerRef = useRef(null); // Reference to the emoji picker

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: typingfile,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    useEffect(() => {
      if (socket) {
        socket.on('typing', () => setIsTyping(true));
        socket.on('stop typing', () => setIsTyping(false));
      }

      return () => {
        if (socket) {
          socket.off('typing');
          socket.off('stop typing');
        }
      };
    }, [socket]);

    useEffect(() => {
      if (isTyping && inputRef.current) {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, [isTyping]);

    useEffect(() => {
      // Scroll to bottom when emoji picker is toggled
      if (msgContainerRef.current && !showEmojiPicker) {
        msgContainerRef.current.scrollTo({
          top: msgContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }

      // Event listener to close emoji picker when clicking anywhere else on the document
      const handleOutsideClick = (event) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
          setShowEmojiPicker(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [showEmojiPicker]);

    const handleSubmit = async (e) => {
      setShowEmojiPicker(false); // Close emoji picker on message send
      e.preventDefault();
      if (typedMessage.trim() !== '') {
        try {
          await sendMessage(typedMessage);
          // Update messages in the UI
          setTypedMessage('');
        } catch (error) {
          console.error('Failed to send message:', error);
        }
      }
    };

    const handleChange = (e) => {
      setTypedMessage(e.target.value);

      if (!socket) {
        return;
      }
      if (!typing) {
        setTyping(true);
        socket.emit('typing', { userId: selectedConversation._id });
      }
      let lastTypingTime = new Date().getTime();
      var timeLength = 1200;
      setTimeout(() => {
        var timenow = new Date().getTime();
        var diff = timenow - lastTypingTime;
        if (diff >= timeLength && typing) {
          socket.emit('stop typing', { userId: selectedConversation._id });
          setTyping(false);
        }
      }, timeLength);
    };

    const handleEmojiClick = (event, emojiObject) => {
      // console.log("typed messssss",typedMessage);
      // console.log("emoji ah",event.emoji);
      setTypedMessage(typedMessage + event.emoji);
    };

    const toggleEmojiPicker = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };
    const addClick = () => {
      setaddclickable(!addclickable);
      if (!addclickable) {
        setShowEmojiPicker(false); // Close emoji picker if it's open
      }
    };
    

    return (
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        {isTyping && (
          <div className="text-blue-500 text-2xl mb-1" ref={inputRef}>
            <Lottie options={defaultOptions} width={55} style={{ marginLeft: 0, marginTop: '0px', paddingTop: '10px' }} />
          </div>
        )}
       <div className="w-full flex items-center border border-gray-600 rounded-lg relative">


{addclickable && (
  <>
  <button type="button" onClick={toggleEmojiPicker} style={{ position: 'absolute', top: '-39px', left: '10px', fontSize: '18px', backgroundColor: 'transparent', border: 'none', color: '#fff' }}>
    😊
  </button>

  <div>
    <button type='button' style={{ position: 'absolute', left: '40px', backgroundColor: 'transparent', border: 'none', color: '#fff' }}>
   <img src="./folder.png" alt=""/>
    </button>
  </div>
</>

)}




  <button type="button" onClick={addClick} style={{ fontSize: '25px', paddingLeft: '5px', paddingRight: '5px', backgroundColor: 'transparent', border: 'none', color: '#fff' }}>
    {addclickable ? 'x' : '+'}
  </button>

  <input
    type="text"
    value={typedMessage}
    onChange={handleChange}
    className="flex-grow px-2.5 py-2 text-sm bg-gray-700 border-none text-white focus:outline-none"
    placeholder="Send a message"
  />

  {showEmojiPicker && (
    <div ref={emojiPickerRef} className="absolute top-[-40] left-1 mt-[-345px] z-10 bg-white rounded-lg shadow-md p-2 w-full max-w-[350px] max-h-[300px] overflow-y-hidden overflow-x-hidden">
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>
  )}

  <button type="submit" className="p-2 text-white">
    {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
  </button>
</div>

      
      </form>
    );
  };

  export default MessageInput;
