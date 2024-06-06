import React, { useState, useEffect, useRef } from 'react';
import useGroups from '../../hooks/group/useGroups';
import useGetConversation from '../../hooks/usegetConversation';
import useCreate from '../../hooks/group/useCreate';
import GroupVisible from './GroupVisible';
import { MenuIcon } from '@heroicons/react/outline';

const Group = ({ toggleGroupbox, onGroupClick }) => {
    const { sidebarUsers } = useGetConversation();
    const { groups } = useGroups();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [name, setName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { createGroup, loading } = useCreate();
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth <= 765 ? 250 : 300,
        height: '600px',
    });

    const handleUserSelectionChange = (userId, checked) => {
        if (checked) {
            setSelectedUsers(prevUsers => [...prevUsers, userId]);
        } else {
            setSelectedUsers(prevUsers => prevUsers.filter(id => id !== userId));
        }
    };

    const handleCreateGroup = async () => {
        try {
            await createGroup(name, selectedUsers);
            setSelectedUsers([]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth <= 765 ? 250 : 300,
                height: '600px',
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [groups]);

    return (
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{ height: dimensions.height, width: `${dimensions.width}px` }}>
            <div className="bg-red-100 h-full overflow-y-auto" ref={containerRef}>
                <div className="p-4 bg-gray-800 text-white">
                    {/* Header content if any */}
                </div>
                <div className="p-4">
                    {groups.length === 0 && <p>No groups found.</p>}
                    <div className="flex items-center pb-4">
                        <h1 className="text-2xl font-bold mr-4">Groups</h1>
                        <MenuIcon className="h-6 w-6 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        {isMenuOpen && (
                            <button className="bg-blue-500 text-white py-2 px-4 ml-4 rounded" onClick={() => setIsModalOpen(true)}>Create Group</button>
                        )}
                    </div>
                    {groups.map(group => (
                        <GroupVisible key={group._id} group={group} toggleGroupbox={toggleGroupbox} onGroupClick={onGroupClick} />
                    ))}
                </div>
                {isModalOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                        <div className="modal-container bg-white w-1/2 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                            <div className="modal-content py-4 text-left px-6">
                                <div className="flex justify-between items-center pb-3">
                                    <p className="text-2xl font-bold">Create Group</p>
                                    <button className="modal-close cursor-pointer z-50" onClick={() => setIsModalOpen(false)}>
                                        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <path d="M12.72 5.293a1 1 0 0 0-1.414 0L9 7.586 7.707 6.293a1 1 0 0 0-1.414 1.414L7.586 9l-1.293 1.293a1 1 0 1 0 1.414 1.414L9 10.414l1.293 1.293a1 1 0 0 0 1.414-1.414L10.414 9l1.293-1.293a1 1 0 0 0 0-1.414z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700">Group Name:</label>
                                    <input type="text" className="form-input mt-1 block w-full" placeholder="Enter group name" value={name} onChange={e => setName(e.target.value)} />
                                    <label className="block text-sm font-medium text-gray-700 mt-4">Select Users:</label>
                                    {sidebarUsers.map(user => (
                                        <div key={user._id} className="flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                id={user._id}
                                                checked={selectedUsers.includes(user._id)}
                                                onChange={e => handleUserSelectionChange(user._id, e.target.checked)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={user._id}>{user.fullName}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleCreateGroup}>Create Group</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Group;
