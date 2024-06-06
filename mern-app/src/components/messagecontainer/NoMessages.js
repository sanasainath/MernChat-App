import React from 'react'

function NoMessages() {
  return (
     <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-400">No Messages Yet</h2>
      <p className="text-gray-500">Start the conversation by sending a message</p>
    </div>
  )
}

export default NoMessages
