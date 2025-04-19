import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageGroup from "./MessageGroup";
import MessageInput from "./MessageInput";
import LoadingSpinner from "../generics/LoadingSpinner";
import { useNotifications } from "../../hooks/useNotifications";
import { usePreferences } from "../../hooks/usePreferences";
import { addMessage, subscribeToMessages } from "../../api/thunk";
import ScrollToBottomButton from "./ScrollToBottomButton";
import { updateMessages } from "../../store/reducer";

function Chatbox() {
  const [isNearBottom, setIsNearBottom] = useState(true);
  const dispatch = useDispatch();
  const { user, messages, loading } = useSelector((state) => state.reducer);
  const { showNotification } = useNotifications();
  const { preferences } = usePreferences();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Set up real-time subscription
    unsubscribeRef.current = subscribeToMessages(handleMessageUpdate);

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [user, showNotification, dispatch]);

  const handleMessageUpdate = (newMessages) => {
    dispatch(updateMessages(newMessages));

    // Check for new messages to show notifications
    const lastMessageContainer = lastMessageRef.current;
    if (lastMessageContainer && newMessages.length > 0) {
      const lastMessage = newMessages[newMessages.length - 1];
      const { id, user: lastUser, text } = lastMessage;
      const hasNewMessage =
        id !== lastMessageContainer && lastUser !== user?.email;

      if (hasNewMessage) {
        showNotification("New Message", {
          body: `${lastUser}: ${text}`,
          tag: "chat-message",
        });
      }
    }

    lastMessageRef.current =
      newMessages.length > 0 ? newMessages[newMessages.length - 1].id : null;
  };

  const scrollToBottom = (force = false) => {
    if (force || isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToBottom = useCallback(scrollToBottom, [isNearBottom]);

  const scroll = () => {
    if (!containerRef.current) return;

    const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
    const scrollPosition = scrollHeight - scrollTop - clientHeight;
    setIsNearBottom(scrollPosition < 100);
  };

  const handleScroll = useCallback(scroll, []);

  useEffect(() => {
    handleScrollToBottom();
  }, [messages, handleScrollToBottom]);

  const handleGroupMessage = (messages) => {
    if (!preferences.messageGrouping) {
      return [{ date: "Messages", messages }];
    }

    const groups = {};
    messages.forEach((message) => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }

      const newGroupByDate = [...groups[date], message];
      groups[date] = newGroupByDate;
    });

    const formattedGroups = Object.entries(groups).map(([date, messages]) => ({
      date,
      messages,
    }));

    return formattedGroups;
  };

  const groupMessagesByDate = useCallback(handleGroupMessage, [
    preferences.messageGrouping,
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      text,
      user: user?.email || "Anonymous",
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));
  };

  return (
    <div className="flex flex-col h-[80vh] rounded-lg shadow-md p-4">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" color="blue" />
        </div>
      ) : (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto mb-4 scroll-smooth"
        >
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No messages yet. Start a conversation!
            </div>
          ) : (
            <>
              {groupMessagesByDate(messages).map(({ date, messages }) => (
                <MessageGroup key={date} date={date} messages={messages} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      )}
      <div className="flex-none">
        <MessageInput onSend={handleSendMessage} />
      </div>
      {!isNearBottom && (
        <ScrollToBottomButton onClick={() => handleScrollToBottom(true)} />
      )}
    </div>
  );
}

export default Chatbox;
