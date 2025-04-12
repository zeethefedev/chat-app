import React, { useMemo } from 'react';
import { usePreferences } from '../../hooks/usePreferences';
import { useAutoFormat } from '../../hooks/useAutoFormat';

function Message({ text, user, timestamp }) {
  const { preferences } = usePreferences();
  const { applyAutoFormat } = useAutoFormat();

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (preferences.timestampFormat === '24h') {
      return date.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getFontSize = () => {
    switch (preferences.fontSize) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const formatMessageText = useMemo(() => {
    let formattedText = text;

    // First apply manual formatting
    formattedText = formattedText
      // Code blocks
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded font-mono text-sm">$1</code>')
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/_([^_]+)_/g, '<em>$1</em>')
      // Strikethrough
      .replace(/~~([^~]+)~~/g, '<del>$1</del>')
      // Simple emoji replacement
      .replace(/:smile:/g, '😊')
      .replace(/:heart:/g, '❤️')
      .replace(/:thumbsup:/g, '👍');

    // Then apply auto-formatting
    formattedText = applyAutoFormat(formattedText);

    return { __html: formattedText };
  }, [text, applyAutoFormat]);

  return (
    <div className="mb-4 fade-in">
      <div className="flex items-start gap-2">
        <div className={`
          p-3 rounded-lg shadow-sm max-w-[80%] message-new
          ${preferences.theme === 'dark' 
            ? 'bg-gray-800 text-white' 
            : 'bg-white'
          }
        `}>
          <div className={`font-semibold ${getFontSize()}`}>{user}</div>
          <p 
            className={`${getFontSize()} break-words`}
            dangerouslySetInnerHTML={formatMessageText}
          />
          {timestamp && (
            <div className={`
              text-xs mt-1
              ${preferences.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
            `}>
              {formatTimestamp(timestamp)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;