// Format the message for display
export const formatMessagePreview = (text) => {
  if (!text) return;

  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/~~(.*?)~~/g, "<del>$1</del>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
};

export const formatText = (text) => {
  // First apply manual formatting
  const formattedText = text
    // Code blocks
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 px-1 py-0.5 rounded font-mono text-sm">$1</code>'
    )
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    // Strikethrough
    .replace(/~~([^~]+)~~/g, "<del>$1</del>")
    // Simple emoji replacement
    .replace(/:smile:/g, "😊")
    .replace(/:heart:/g, "❤️")
    .replace(/:thumbsup:/g, "👍");

  return formattedText;
};

export const formatTimestamp = (timestamp, preferences) => {
  const date = new Date(timestamp);
  if (preferences.timestampFormat === "24h") {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDate = (dateStr) => {
  const messageDate = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (messageDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return messageDate.toLocaleDateString();
};
