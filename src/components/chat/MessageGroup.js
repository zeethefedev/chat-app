import React from "react";
import Message from "./Message";
import { formatDate } from "../../utils/chat.utils";

function MessageGroup({ messages, date }) {
  const formattedDate = formatDate(date);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-600">
          {formattedDate}
        </div>
      </div>
      <div className="space-y-2">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>
    </div>
  );
}

export default MessageGroup;
