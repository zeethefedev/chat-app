import React, { useState, useRef, useEffect } from "react";
import Button from "../generics/Button";
import { usePreferences } from "../../hooks/usePreferences";
import { useTextFormatting } from "../../hooks/useTextFormatting";
import { formatMessagePreview } from "../../utils/chat.utils";

function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef(null);
  const { preferences } = usePreferences();
  const { handleFormatting } = useTextFormatting();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !isSending) {
      setIsSending(true);
      try {
        await onSend(message);
        setMessage("");
        inputRef.current?.focus();
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    // Skip if using IME (Input Method Editor for non-English input)
    if (isComposing) return;

    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      }

      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    }

    // Text formatting shortcuts
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
      const { selectionStart, selectionEnd } = inputRef.current;
      let newText = message;

      const formattingKeys = ["b", "i", "s", "`"];
      if (formattingKeys.includes(e.key)) {
        e.preventDefault();
        newText = handleFormatting(
          message,
          e.key,
          selectionStart,
          selectionEnd
        );
        setMessage(newText);
      }
    }
  };

  const handleTextFormatClick = (event, formatKey) => {
    event.preventDefault();
    const { selectionStart, selectionEnd } = inputRef.current;

    const textMessage = handleFormatting(
      message,
      formatKey,
      selectionStart,
      selectionEnd
    );

    setMessage(textMessage);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
          className="w-full p-2 rounded border min-h-[40px] max-h-32 resize-y bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          disabled={isSending}
          style={{
            fontSize:
              preferences.fontSize === "large"
                ? "1.125rem"
                : preferences.fontSize === "small"
                ? "0.875rem"
                : "1rem",
          }}
        />
        {message.length > 0 && (
          <div className="absolute right-2 bottom-2 text-xs text-gray-500">
            {message.length} character{message.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {(message.includes("*") ||
        message.includes("_") ||
        message.includes("~") ||
        message.includes("`")) && (
        <div className="text-sm p-2 rounded bg-gray-50">
          <div className="text-xs text-gray-500 mb-1">Preview:</div>
          <div
            dangerouslySetInnerHTML={{ __html: formatMessagePreview(message) }}
            className="text-gray-700"
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <TextFormatButton
            onClick={(e) => handleTextFormatClick(e, "b")}
            title="Bold (⌘/Ctrl + B)"
          >
            <strong>B</strong>
          </TextFormatButton>
          <TextFormatButton
            onClick={(e) => handleTextFormatClick(e, "i")}
            title="Italic (⌘/Ctrl + I)"
          >
            <em>I</em>
          </TextFormatButton>
          <TextFormatButton
            onClick={(e) => handleTextFormatClick(e, "s")}
            title="Strikethrough (⌘/Ctrl + S)"
          >
            <del>S</del>
          </TextFormatButton>
          <TextFormatButton
            onClick={(e) => handleTextFormatClick(e, "`")}
            title="Code (⌘/Ctrl + `)"
          >
            {`<>`}
          </TextFormatButton>
        </div>
        <Button
          label={isSending ? "Sending..." : "Send"}
          onClick={handleSubmit}
          isLoading={isSending}
          disabled={!message.trim()}
        />
      </div>
    </form>
  );
}

function TextFormatButton({ onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded hover:bg-opacity-80 text-gray-600 hover:bg-gray-100"
      title={title}
    >
      {children}
    </button>
  );
}

export default MessageInput;
