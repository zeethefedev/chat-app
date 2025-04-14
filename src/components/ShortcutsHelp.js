import React from "react";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useTextFormatting } from "../hooks/useTextFormatting";

function ShortcutsHelp({ isOpen, onClose }) {
  const { shortcuts } = useKeyboardShortcuts();
  const { getFormattingShortcuts } = useTextFormatting();

  if (!isOpen) return null;

  const allShortcuts = [
    {
      category: "Navigation",
      shortcuts: shortcuts,
    },
    {
      category: "Text Formatting",
      shortcuts: getFormattingShortcuts(),
    },
    {
      category: "Message Input",
      shortcuts: [
        { key: "Enter", description: "Send message" },
        { key: "Shift + Enter", description: "New line" },
        { key: "⌘/Ctrl + Backspace", description: "Clear input" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-2xl w-full mx-4 rounded-lg shadow-xl bg-white text-gray-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Close shortcuts help"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {allShortcuts.map(({ category, shortcuts }) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  {category}
                </h3>
                <div className="grid gap-2 bg-gray-50 rounded-lg p-4">
                  {shortcuts.map(({ key, description }) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600">{description}</span>
                      <kbd className="px-2 py-1 rounded text-sm bg-white border-gray-300 text-gray-700 border shadow-sm">
                        {key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Press ? to toggle this shortcuts panel at any time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortcutsHelp;
