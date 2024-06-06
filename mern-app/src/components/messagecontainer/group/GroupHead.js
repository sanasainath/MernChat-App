import React, { useState, useEffect } from 'react';
import useGroupConversation from '../../zustand/useGroupConversation';
import NoGroup from '../../sidebar/group/NoGroup';
import GroupStart from './GroupStart';
import useGroups from '../../hooks/group/useGroups';
import GroupInput from './GroupInput';

function GroupHead() {
    const { selectedGroupConversation } = useGroupConversation();
    const { groups } = useGroups();
    const [dimensions, setDimensions] = useState({
        height: window.innerWidth <= 765 ? 700 : 'auto',
        width: window.innerWidth <= 765 ? 310 : 500,
    });

    // Find the group with the selected ID
    const selectedGroup = groups.find(group => group._id === selectedGroupConversation);

    useEffect(() => {
        const handleResize = () => {
            const newHeight = window.innerWidth <= 765 ? 700 : 'auto';
            const newWidth = window.innerWidth <= 765 ? 310 : 500;
            setDimensions({ height: newHeight, width: newWidth });
        };

        handleResize(); // Initial call to set dimensions based on initial window width

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures that this effect only runs once on component mount

    return (
        <div className='flex flex-col' style={{ height: dimensions.height, width: `${dimensions.width}px` }}> 
            {!selectedGroupConversation ? (
                <NoGroup />
            ) : (
                <>
                    <div className='bg-gray-600 px-4 py-4 mb-2'>
                        <span className='label-text mr-2 font-semibold text-xl text-gray-400'></span>
                        {/* Display the name of the selected group */}
                        <span className='text-teal-500 text-xl font-bold'>{selectedGroup ? selectedGroup.name : ''}</span>
                    </div>
                    <GroupStart />
                    <GroupInput />
                </>
            )}
        </div>
    );
}

export default GroupHead;
