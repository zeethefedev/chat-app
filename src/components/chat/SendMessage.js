import React, { useState, useRef, useEffect } from 'react';
import Button from '../generics/Button';
import { usePreferences } from '../../hooks/usePreferences';
import { useTextFormatting } from '../../hooks/useTextFormatting';

function SendMessage({ onSend }) {
  const [message, setMessage] = useState('');
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
        setMessage('');
        inputRef.current?.focus();
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    // Skip if using IME (Input Method Editor for non-English input)
    if (isComposing) return;

    if (e.key === 'Enter') {
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

      switch(e.key) {
        case 'b':
        case 'i':
        case 's':
        case '`':
          e.preventDefault();
          newText = handleFormatting(
            message,
            e.key,
            selectionStart,
            selectionEnd
          );
          setMessage(newText);
          break;
        default:
          break;
      }
    }
  };

  // Format the message for display
  const formatMessagePreview = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
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
          className={`
            w-full p-2 rounded border min-h-[40px] max-h-32 resize-y
            ${preferences.theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-colors duration-200
          `}
          disabled={isSending}
          style={{
            fontSize: preferences.fontSize === 'large' ? '1.125rem' : 
                     preferences.fontSize === 'small' ? '0.875rem' : '1rem'
          }}
        />
        {message.length > 0 && (
          <div className={`
            absolute right-2 bottom-2 text-xs
            ${preferences.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
          `}>
            {message.length} character{message.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      {message.includes('*') || message.includes('_') || message.includes('~') || message.includes('`') ? (
        <div className={`
          text-sm p-2 rounded
          ${preferences.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}
        `}>
          <div className="text-xs text-gray-500 mb-1">Preview:</div>
          <div 
            dangerouslySetInnerHTML={{ __html: formatMessagePreview(message) }}
            className={`
              ${preferences.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            `}
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              const { selectionStart, selectionEnd } = inputRef.current;
              setMessage(handleFormatting(message, 'b', selectionStart, selectionEnd));
            }}
            className={`
              p-1 rounded hover:bg-opacity-80
              ${preferences.theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}
            `}
            title="Bold (⌘/Ctrl + B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => {
              const { selectionStart, selectionEnd } = inputRef.current;
              setMessage(handleFormatting(message, 'i', selectionStart, selectionEnd));
            }}
            className={`
              p-1 rounded hover:bg-opacity-80
              ${preferences.theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}
            `}
            title="Italic (⌘/Ctrl + I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => {
              const { selectionStart, selectionEnd } = inputRef.current;
              setMessage(handleFormatting(message, 's', selectionStart, selectionEnd));
            }}
            className={`
              p-1 rounded hover:bg-opacity-80
              ${preferences.theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}
            `}
            title="Strikethrough (⌘/Ctrl + S)"
          >
            <del>S</del>
          </button>
          <button
            type="button"
            onClick={() => {
              const { selectionStart, selectionEnd } = inputRef.current;
              setMessage(handleFormatting(message, '`', selectionStart, selectionEnd));
            }}
            className={`
              p-1 rounded hover:bg-opacity-80 font-mono
              ${preferences.theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}
            `}
            title="Code (⌘/Ctrl + `)"
          >
            {`<>`}
          </button>
        </div>
        <Button 
          label={isSending ? 'Sending...' : 'Send'}
          onClick={handleSubmit}
          isLoading={isSending}
          disabled={!message.trim()}
        />
      </div>
    </form>
  );
}

export default SendMessage;