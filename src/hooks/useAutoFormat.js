import { useCallback } from "react";

export function useAutoFormat() {
  const autoFormatPatterns = [
    // URLs to clickable links
    {
      pattern: /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g,
      transform: (match) => `[link](${match})`,
    },
    // Email addresses
    {
      pattern: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g,
      transform: (match) => `[email](${match})`,
    },
    // Markdown style links [text](url)
    {
      pattern: /\[([^\]]+)\]\(([^)]+)\)/g,
      transform: (_, text, url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${text}</a>`,
    },
    // Lists starting with - or *
    {
      pattern: /^[-*]\s(.+)$/gm,
      transform: (_, text) => `• ${text}`,
    },
    // Basic quotes
    {
      pattern: /^>\s(.+)$/gm,
      transform: (_, text) =>
        `<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-2 italic">${text}</blockquote>`,
    },
    // Headings
    {
      pattern: /^(#{1,3})\s(.+)$/gm,
      transform: (_, hashes, text) => {
        const size =
          hashes.length === 1
            ? "text-xl font-bold"
            : hashes.length === 2
            ? "text-lg font-semibold"
            : "text-base font-medium";
        return `<div class="${size}">${text}</div>`;
      },
    },
  ];

  const applyAutoFormat = useCallback((text) => {
    let formattedText = text;

    // Apply each pattern transformation
    autoFormatPatterns.forEach(({ pattern, transform }) => {
      formattedText = formattedText.replace(pattern, transform);
    });

    return formattedText;
  }, []);

  return {
    applyAutoFormat,
  };
}
