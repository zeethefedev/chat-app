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
    unsubscribeRef.current = subscribeToMessages((newMessages) => {
      dispatch(updateMessages(newMessages));

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
        newMessages.length > 0 ? newMessages[newMessages.length - 1].id : null;
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [user, showNotification, dispatch]);

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

    await dispatch(addMessage(newMessage));
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
        <ScrollToBottomButton onClick={() => scrollToBottom(true)} />
      )}
    </div>
  );
}

export default Chatbox;
