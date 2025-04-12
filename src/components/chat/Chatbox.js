import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageGroup from "./MessageGroup";
import SendMessage from "./SendMessage";
import LoadingSpinner from "../generics/LoadingSpinner";
import { useNotifications } from "../../hooks/useNotifications";
import { usePreferences } from "../../hooks/usePreferences";
import { addDocument, subscribeToCollection } from "../../api/thunk";

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.reducer);
  const { showNotification } = useNotifications();
  const { preferences } = usePreferences();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Set up real-time subscription
    unsubscribeRef.current = subscribeToCollection(
      "messages",
      (newMessages) => {
        setMessages(newMessages);
        setIsLoading(false);

        // Check for new messages to show notifications
        if (lastMessageRef.current && newMessages.length > 0) {
          const lastMessage = newMessages[newMessages.length - 1];
          if (
            lastMessage.id !== lastMessageRef.current &&
            lastMessage.user !== user?.email
          ) {
            showNotification("New Message", {
              body: `${lastMessage.user}: ${lastMessage.text}`,
              tag: "chat-message",
            });
          }
        }
        lastMessageRef.current =
          newMessages.length > 0
            ? newMessages[newMessages.length - 1].id
            : null;
      }
    );

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [user, showNotification]);

  const scrollToBottom = useCallback(
    (force = false) => {
      if (force || isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [isNearBottom]
  );

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
      const scrollPosition = scrollHeight - scrollTop - clientHeight;
      setIsNearBottom(scrollPosition < 100);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const groupMessagesByDate = useCallback(
    (messages) => {
      if (!preferences.messageGrouping) {
        return [
          {
            date: "Messages",
            messages: messages,
          },
        ];
      }

      const groups = {};
      messages.forEach((message) => {
        const date = new Date(message.timestamp).toDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(message);
      });
      return Object.entries(groups).map(([date, messages]) => ({
        date,
        messages,
      }));
    },
    [preferences.messageGrouping]
  );

  const handleSendMessage = async (text) => {
    const newMessage = {
      text,
      user: user?.email || "Anonymous",
      timestamp: new Date().toISOString(),
    };

    await dispatch(
      addDocument({
        collectionName: "messages",
        data: newMessage,
      })
    );
  };

  return (
    <div className="flex flex-col h-[80vh] rounded-lg shadow-md p-4">
      {isLoading ? (
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
      <SendMessage onSend={handleSendMessage} />
      {!isNearBottom && (
        <ScrollToBottomButton onClick={() => scrollToBottom(true)} />
      )}
    </div>
  );
}

function ScrollToBottomButton({ onClick }) {
  <button
    onClick={onClick}
    className="absolute bottom-20 right-8 p-2 rounded-full shadow-lg transition-colors text-white"
    aria-label="Scroll to bottom"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </button>;
}

export default Chatbox;
