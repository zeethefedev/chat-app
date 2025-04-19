import React from "react";

function TextArea(props) {
  const { value, inputRef } = props;
  return (
    <div className="flex-1 relative">
      <textarea
        ref={inputRef}
        value={value}
        placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
        className="w-full p-2 rounded border min-h-[40px] max-h-32 resize-y bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        {...props}
      />
      {value.length > 0 && (
        <div className="absolute right-2 bottom-2 text-xs text-gray-500">
          {value.length} character{value.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

export default TextArea;
