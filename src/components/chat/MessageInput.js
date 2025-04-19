import React, { useState, useRef, useEffect } from "react";
import Button from "../generics/Button";
import { usePreferences } from "../../hooks/usePreferences";
import { useTextFormatting } from "../../hooks/useTextFormatting";
import { formatMessagePreview } from "../../utils/chat.utils";
import TextArea from "../generics/TextArea";

const FORMATTING_CHARS = ["*", "_", "~", "`"];

function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef(null);
  const { preferences } = usePreferences();
  const { handleFormatting } = useTextFormatting();

  const isFormattedMessage = FORMATTING_CHARS.some((char) =>
    message.includes(char)
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim() || isSending) return;

    setIsSending(true);
    try {
      onSend(message);
      setMessage("");
      inputRef.current?.focus();
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    // Skip if using IME (Input Method Editor for non-English input)
    if (isComposing) return;

    const { key, shiftKey, metaKey, ctrlKey } = event;

    if (key !== "Enter") return;
    if (shiftKey) return;
    if (ctrlKey || metaKey) return;

    event.preventDefault();
    handleSubmit(event);

    // Text formatting shortcuts
    handleFormatMessage(event);
  };

  const handleFormatMessage = (event) => {
    const { key, shiftKey, metaKey, ctrlKey } = event;
    // Text formatting shortcuts
    const isFormattingShortcut = (metaKey || ctrlKey) && !shiftKey;
    const formattingKeys = ["b", "i", "s", "`"];

    if (!isFormattingShortcut) return;

    const { selectionStart, selectionEnd } = inputRef.current;
    let newText = message;

    if (formattingKeys.includes(key)) {
      event.preventDefault();
      newText = handleFormatting(message, key, selectionStart, selectionEnd);
      setMessage(newText);
    }
  };

  const handleTextFormatClick = (event, formatKey) => {
    event.preventDefault();
    const { selectionStart, selectionEnd } = inputRef.current || {};

    const textMessage = handleFormatting(
      message,
      formatKey,
      selectionStart,
      selectionEnd
    );

    setMessage(textMessage);
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setMessage(newText);
  };

  const fontSize =
    preferences.fontSize === "large"
      ? "1.125rem"
      : preferences.fontSize === "small"
      ? "0.875rem"
      : "1rem";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <TextArea
        inputRef={inputRef}
        value={message}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        disabled={isSending}
        style={{ fontSize }}
      />
      {isFormattedMessage && <MessagePreview message={message} />}
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

function MessagePreview({ message }) {
  return (
    <div className="text-sm p-2 rounded bg-gray-50">
      <div className="text-xs text-gray-500 mb-1">Preview:</div>
      <div
        dangerouslySetInnerHTML={{ __html: formatMessagePreview(message) }}
        className="text-gray-700"
      />
    </div>
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
