import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendData from '../../hooks/group/useSendData';


const GroupInput = () => {
    const [typedMessage, setTypedMessage] = useState('');
    const { loading, sendGroupData } = useSendData();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (typedMessage.trim() !== '') {
            try {
                await sendGroupData(typedMessage);
           
                setTypedMessage('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    const handleChange = (e) => {
        setTypedMessage(e.target.value);
    };

    return (
        <form className='px-2 my-2 flex justify-end' onSubmit={handleSubmit}>
            <div className='w-full flex items-center border border-gray-600 rounded-lg'>
                <input
                    type='text'
                    value={typedMessage}
                    onChange={handleChange}
                    className='flex-grow px-2.5 py-2 text-sm bg-gray-700 border-none text-white focus:outline-none'
                    placeholder='Send a message'
                />
                <button type='submit' className='p-2 text-white'>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
            </div>
        </form>
    );
};

export default GroupInput;
