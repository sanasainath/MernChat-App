import React, { useEffect, useState, useRef ,useMemo} from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Conversation from './Conversation';
import useGetConversation from '../hooks/usegetConversation';
import { MenuIcon } from '@heroicons/react/outline';
import { BellIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useSocketContext } from '../../helpers/Socket';
import useConversation from '../zustand/useConversation';
import useGetSeen from '../hooks/usegetSeen';

const UserDataFetch = ({ toggleChatbox }) => {
  const { loading, sidebarUsers } = useGetConversation();
  const {sidebarSeen}=useGetSeen();
  const [search, setSearch] = useState('');
  const { selectedConversation, setSelectedConversation, messages } = useConversation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { Notifications, setNotifications } = useSocketContext();
  const [isBellClicked, setIsBellClicked] = useState(false);

  const menuRef = useRef(null);
console.log('side bar seeeeeeeeeeeeeeeeeeeeennnnnnnnnnnn',sidebarSeen);
const filteredUsers = useMemo(() => {
  return sidebarUsers.filter(user => {
    const itemName = user.fullName ? user.fullName : '';
    return itemName.toLowerCase().includes(search.trim().toLowerCase());
  });
}, [search, sidebarUsers]);

  let userdata = []; // Define userdata variable
  let matchedUserNames = []; // Define matchedUserNames variable

  Notifications.forEach(notification => {
    sidebarUsers.forEach(user => {
      if (notification.senderId === user._id) {
        userdata.push(user);
        matchedUserNames.push(user.fullName);
      }
    });
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (isDropdownOpen || isBellClicked) && // Check if the dropdown or bell notification is open
        event.target.closest(".dropdown-menu") === null && // Check if the click occurred outside the dropdown menu
        event.target.closest(".menu-icon") === null && // Check if the click occurred outside the menu icon
        event.target.closest(".bell-icon") === null &&// Check if the click occurred outside the bell icon
        event.target.closest(".notification-toast") === null
      ) {
        setIsDropdownOpen(false); // Close the dropdown
        setIsBellClicked(false); // Close the bell notification
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isBellClicked]); // Ensure to include isDropdownOpen and isBellClicked in the dependency array

  useEffect(() => {
    setIsBellClicked(false);
    setIsDropdownOpen(false);
  }, [selectedConversation, messages]);

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsBellClicked(false);
  };

  const handleBellClick = () => {
    console.log("Bell icon clicked");
    setIsBellClicked(true);
    setIsDropdownOpen(false);
  };

  const handleClick = () => {
    toggleChatbox();
    console.log("handle click working");
    setSelectedConversation(userdata[0]);
    setIsBellClicked(false);
    setIsDropdownOpen(false);
    setNotifications([]);
  };

  return (
    <div className="py-2 flex flex-col">
      <div className="relative flex flex-row">
        <input
          type="text"
          placeholder="Search users"
          value={search}
          onChange={handleSearchChange}
          className="input input-bordered rounded-full pl-12 mb-6"
          style={{ paddingLeft: "2.5rem" }}
        />
        <button type="button" className="btn btn-circle bg-sky-500 text-white ml-2">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
        <div className="relative" ref={menuRef}>
          <div className="flex items-center relative">
            <MenuIcon
              style={{ marginLeft: '10px', marginTop: '0px', cursor: 'pointer' }}
              className="h-12 w-9 text-white hover:text-gray-600 focus:outline-none menu-icon"
              onClick={handleToggleDropdown}
            />
            {isDropdownOpen && (
              <ul className="dropdown-menu absolute z-10 top-0 right-0 mt-16 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                <li className="flex items-center mb-2">
                  <UserCircleIcon className="h-6 w-6 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none" />
                  <span>Profile</span>
                </li>
                <li className="flex items-center relative mb-2">
                  <div onClick={handleBellClick} className="flex items-center cursor-pointer bell-icon">
                    <BellIcon className="h-6 w-6 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none" />
                    <span>Notifications</span>
                    {Notifications.length > 0 && (
                      <div className="notification-badge absolute top-1 left-0 transform translate-x-1/2 -translate-y-1/2">
                        <span className="badge bg-red-500">{Notifications.length}</span>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {filteredUsers.length > 0 ? (
  filteredUsers.map((user, idx) => {
    // Find the corresponding last seen object for the current user
    const matchingSeen = sidebarSeen.find(seen => seen.user._id === user._id);
    return (
      <Conversation
      key={user._id}
      user={user}
      lastIdx={idx === filteredUsers.length - 1}
      lastSeenTime={matchingSeen ? matchingSeen.lastSeen : null}
      toggleChatbox={toggleChatbox} // Pass toggleChatbox prop
    />
    
    );
  })
) : (
  <p className='text-gray-300 px-10 py-30'>No users found</p>
)}


{isBellClicked && (
  <div
    onClick={(e) => {
      e.stopPropagation(); // Prevent the click event from propagating to parent elements
      handleClick(); // Call handleClick function
    }}
    style={{
      position: "absolute",
      top: "0px", // Adjust this value to position the toast above the menu icon
      left: "50%", // Center horizontally
      transform: "translateX(-50%)", // Center horizontally
      backgroundColor: "rgba(255, 192, 203, 0.9)", // Light pink background color
      padding: "10px 20px",
      borderRadius: "5px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Box shadow for a slight elevation effect
      zIndex: "9999", // Ensure the toast appears above other elements
    }}
    className="notification-toast" // Add a class name for easier styling and debugging
  >
    <p
      style={{
        color: "black", // Black text color
        fontSize: "16px",
        fontWeight: "bold",
        width:'250px',
        textAlign:'center',
        cursor: "pointer" // Add cursor pointer for better indication
      }}
      className="text-gray-600"
    >
      {Notifications.length > 0 ? (
        Notifications.length === 1 ? (
          `Message from ${matchedUserNames[0]}`
        ) : (
          `Messages from ${matchedUserNames.join(", ")}`
        )
      ) : (
        "No notifications"
      )}
    </p>
  </div>
)}


    </div>
  );
};

export default UserDataFetch;
