import React from "react";
import { useSelector } from "react-redux";
import Chatbox from "../components/chat/Chatbox";
import ErrorMessage from "../components/generics/ErrorMessage";
import LoadingOverlay from "../components/generics/LoadingOverlay";

function Chat() {
  const { loading, error } = useSelector((state) => state.reducer);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Chat Room</h2>
      {error && <ErrorMessage message={error} className="mb-4" />}
      {loading ? (
        <LoadingOverlay className="flex justify-center items-center h-[80vh]" />
      ) : (
        <Chatbox />
      )}
    </div>
  );
}

export default Chat;
