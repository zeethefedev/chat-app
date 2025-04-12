import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "./usePreferences";

export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const { preferences, updatePreference } = usePreferences();

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle keyboard shortcuts when Cmd/Ctrl is pressed
      if (!(event.metaKey || event.ctrlKey)) return;

      switch (event.key) {
        case "k":
          // Toggle theme
          event.preventDefault();
          updatePreference(
            "theme",
            preferences.theme === "dark" ? "light" : "dark"
          );
          break;

        case ",":
          // Open settings
          event.preventDefault();
          navigate("/settings");
          break;

        case "h":
          // Go home
          event.preventDefault();
          navigate("/");
          break;

        case "m":
          // Toggle message grouping
          event.preventDefault();
          updatePreference("messageGrouping", !preferences.messageGrouping);
          break;

        case "n":
          // Toggle notifications
          event.preventDefault();
          updatePreference(
            "notificationsEnabled",
            !preferences.notificationsEnabled
          );
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    navigate,
    preferences.theme,
    preferences.messageGrouping,
    preferences.notificationsEnabled,
    updatePreference,
  ]);

  // Return a list of available shortcuts for documentation
  const shortcuts = [
    { key: "⌘/Ctrl + K", description: "Toggle dark/light theme" },
    { key: "⌘/Ctrl + ,", description: "Open settings" },
    { key: "⌘/Ctrl + H", description: "Go home" },
    { key: "⌘/Ctrl + M", description: "Toggle message grouping" },
    { key: "⌘/Ctrl + N", description: "Toggle notifications" },
  ];

  return { shortcuts };
}
