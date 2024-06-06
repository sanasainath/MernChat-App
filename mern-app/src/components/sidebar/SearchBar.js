import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../zustand/useConversation';
import useGetConversation from '../hooks/usegetConversation';

function SearchBar() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { sidebarUsers } = useGetConversation();
  const [matchingUsers, setMatchingUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setMatchingUsers([]); // Clear matching users when search is empty
      return;
    }

    // Find users based on the search query
    const users = sidebarUsers.filter((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    setMatchingUsers(users);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUserSelect = (user) => {
    setSelectedConversation(user);
    setSearch(""); // Clear search input after selecting user
    setMatchingUsers([]); // Clear matching users
  };

  return (
    <div>
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered rounded-full"
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
      {/* Display matching users */}
      <div className="mt-4">
        {matchingUsers.map((user, index) => (
          <div key={index} onClick={() => handleUserSelect(user)} className="cursor-pointer">
            {/* Render the user's name or other identifying information */}
            {user.fullName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
