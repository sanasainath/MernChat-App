import React from 'react';
import useGroupConversation from '../../zustand/useGroupConversation';

const GroupVisible = ({ group, toggleGroupbox, onGroupClick }) => {
    const { selectedGroupConversation, setSelectedGroupConversation } = useGroupConversation();

    const handleGroupClick = () => {
        setSelectedGroupConversation(group._id);
        onGroupClick(group);
    };

    const isSelected = selectedGroupConversation === group._id;

    return (
        <>
            <div
                className={`p-2 rounded cursor-pointer ${isSelected ? 'bg-blue-200' : 'hover:bg-sky-500'}`}
                onClick={() => {
                    handleGroupClick();
                    toggleGroupbox();
                }}
            >
                <span className="block">{group.name}</span>
            </div>
            <hr className="my-1 border-gray-300" />
        </>
    );
};

export default GroupVisible;
