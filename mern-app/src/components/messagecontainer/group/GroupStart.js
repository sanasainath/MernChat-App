    import React, { useEffect, useRef } from 'react';
    import { useSocketContext } from '../../../helpers/Socket';
    import useGetGroupMessages from '../../hooks/group/usegetGroupMessages';
    import Messages from './Messages';
    import { animateScroll } from 'react-scroll';
    import useGroupConversation from '../../zustand/useGroupConversation';

    function GroupStart() {
        const { GroupMessages, loading } = useGetGroupMessages();
        const { setGroupMessages, selectedGroupConversation } = useGroupConversation();
        const { socket } = useSocketContext();

        const MsgContainerRef = useRef();
        useEffect(() => {
            socket.on('newGroupMessage', (message) => {
                console.log("new message arrived", message);
                setGroupMessages([...GroupMessages, message]);
            });

            return () => {
                socket.off('newGroupMessage');
            };
        }, [socket, GroupMessages, setGroupMessages]);

        useEffect(() => {
            if (MsgContainerRef.current) {
                animateScroll.scrollToBottom({
                    containerId: 'msgContainer',
                    duration: 0,
                });
            }
        }, [GroupMessages, selectedGroupConversation?._id]);

        const flatMessages = GroupMessages.flat();

        return (
            <div className='px-4 flex-1 overflow-auto' id="msgContainer" ref={MsgContainerRef}>
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

                {!loading && (!flatMessages || flatMessages.length === 0) && <p>No messages available</p>}

                {Array.isArray(flatMessages) && flatMessages.length > 0 && (
                    <>
                        {flatMessages.map(message => (
                            <Messages key={message._id} data={message} />
                        ))}
                    </>
                )}
            </div>
        );
    }

    export default GroupStart;
