import React from 'react';
import { useSelector } from 'react-redux';
import Chatbox from '../components/chat/Chatbox';

function Chat() {
  const { loading, error } = useSelector(state => state.reducer);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Chat Room</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Chatbox />
      )}
    </div>
  );
}

export default Chat;