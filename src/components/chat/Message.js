import React, { useMemo } from "react";
import { usePreferences } from "../../hooks/usePreferences";
import { useAutoFormat } from "../../hooks/useAutoFormat";
import { formatText, formatTimestamp } from "../../utils/chat.utils";
import { getFontSize } from "../../utils/perference.utils";

function Message({ text, user, timestamp }) {
  const { preferences } = usePreferences();
  const { applyAutoFormat } = useAutoFormat();

  const formattedTimestamp = formatTimestamp(timestamp, preferences);
  const fontSize = getFontSize(preferences);

  const formatMessageText = useMemo(() => {
    // First apply manual formatting
    let formattedText = formatText(text);

    // Then apply auto-formatting
    formattedText = applyAutoFormat(formattedText);

    return { __html: formattedText };
  }, [text, applyAutoFormat]);

  return (
    <div className="mb-4 fade-in">
      <div className="flex items-start gap-2">
        <div className="p-3 rounded-lg shadow-sm max-w-[80%] message-new">
          <div className={`font-semibold ${fontSize}`}>{user}</div>
          <p
            className={`${fontSize} break-words`}
            dangerouslySetInnerHTML={formatMessageText}
          />
          {timestamp && (
            <div className="text-xs mt-1">{formattedTimestamp}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
