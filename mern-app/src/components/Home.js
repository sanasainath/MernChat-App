import React, { useState, useEffect } from 'react';
import LeftSideChat from './sidebar/LeftSideChat';
import Group from './sidebar/group/Group';
import Chatbox from './messagecontainer/Chatbox';
import GroupHead from './messagecontainer/group/GroupHead';

function Home() {
    const [showLeftSideChat, setShowLeftSideChat] = useState(true);
    const [showGroup, setShowGroup] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 765);
    const [chatboxVisible, setChatboxVisible] = useState(!isMobile);
    const [chatboxToggled, setChatboxToggled] = useState(false);
    const [activeGroup, setActiveGroup] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 765;
            setIsMobile(isMobile);
            if (!isMobile) {
                setShowLeftSideChat(true);
                setChatboxVisible(true);
            } else {
                if (chatboxToggled) {
                    setShowLeftSideChat(false);
                    setChatboxVisible(true);
                } else {
                    setShowLeftSideChat(true);
                    setChatboxVisible(false);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [chatboxToggled]);

    const toggleLeftSideChat = () => {
        setShowLeftSideChat(true);
        setShowGroup(false);
        setActiveGroup(null);
        if (isMobile) {
            setChatboxVisible(false);
            setChatboxToggled(false);
        } else {
            setChatboxVisible(true);
        }
    };

    const toggleGroup = () => {
        setShowLeftSideChat(false);
        setShowGroup(true);
        setActiveGroup(null);
        if (isMobile) {
            setChatboxVisible(false);
            setChatboxToggled(false);
        } else {
            setChatboxVisible(true);
        }
    };

    const handleGroupClick = (group) => {
        setActiveGroup(group);
        if (isMobile) {
            setShowLeftSideChat(false);
            setChatboxVisible(true);
            setChatboxToggled(true);
        }
    };

    const toggleChatbox = () => {
        if (isMobile) {
            setChatboxToggled(!chatboxToggled);
            setChatboxVisible(!chatboxVisible);
            setShowLeftSideChat(!showLeftSideChat);
        }
    };

    const toggleGroupbox = () => {
        if (isMobile) {
            setChatboxToggled(!chatboxToggled);
            setChatboxVisible(!chatboxVisible);
            setShowLeftSideChat(!showLeftSideChat);
        }
    };

    return (
        <div className='flex'>
            <div className="flex-shrink-0 w-12 md:w-16 lg:w-20 xl:w-12 flex flex-col items-center justify-between bg-gray-800 text-white">
                <div className="mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-4 text-blue-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={toggleLeftSideChat}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-4 text-green-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={toggleGroup}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
            </div>

            <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-[rgba(0, 0, 0, 0.2)] backdrop-filter backdrop-blur-lg'>
                {showLeftSideChat && !showGroup && <LeftSideChat toggleChatbox={toggleChatbox} />}
                {showGroup && !activeGroup && <Group toggleGroupbox={toggleGroupbox} onGroupClick={handleGroupClick} />}
                {!showGroup && chatboxVisible && <Chatbox />}
                {activeGroup && (
                    <>
                        {isMobile ? (
                            <GroupHead />
                        ) : (
                            <div className="flex flex-1">
                                <Group toggleGroupbox={toggleGroupbox} onGroupClick={handleGroupClick} />
                                <GroupHead />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
