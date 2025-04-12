import { useCallback } from "react";

export function useTextFormatting() {
  const insertAtCursor = useCallback(
    (text, insertText, selectionStart, selectionEnd) => {
      return (
        text.substring(0, selectionStart) +
        insertText +
        text.substring(selectionEnd)
      );
    },
    []
  );

  const wrapSelection = useCallback(
    (text, wrapper, selectionStart, selectionEnd) => {
      const selectedText = text.substring(selectionStart, selectionEnd);
      return (
        text.substring(0, selectionStart) +
        wrapper +
        selectedText +
        wrapper +
        text.substring(selectionEnd)
      );
    },
    []
  );

  const getFormatting = useCallback((key, isShift) => {
    const formatMap = {
      b: { wrapper: "**", description: "bold" },
      i: { wrapper: "_", description: "italic" },
      s: { wrapper: "~~", description: "strikethrough" },
      "`": { wrapper: "`", description: "code" },
      ":": { text: ":smile:", description: "emoji" },
    };

    return formatMap[key.toLowerCase()];
  }, []);

  const handleFormatting = useCallback(
    (text, key, selectionStart, selectionEnd, isShift = false) => {
      const format = getFormatting(key, isShift);
      if (!format) return text;

      if (format.wrapper) {
        return wrapSelection(
          text,
          format.wrapper,
          selectionStart,
          selectionEnd
        );
      } else if (format.text) {
        return insertAtCursor(text, format.text, selectionStart, selectionEnd);
      }

      return text;
    },
    [getFormatting, wrapSelection, insertAtCursor]
  );

  const getFormattingShortcuts = useCallback(
    () => [
      { key: "⌘/Ctrl + B", description: "Bold text" },
      { key: "⌘/Ctrl + I", description: "Italic text" },
      { key: "⌘/Ctrl + S", description: "Strikethrough text" },
      { key: "⌘/Ctrl + `", description: "Code formatting" },
      { key: ":", description: "Insert emoji" },
    ],
    []
  );

  return {
    handleFormatting,
    getFormattingShortcuts,
  };
}
