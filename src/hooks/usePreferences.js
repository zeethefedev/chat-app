import { useState, useEffect } from "react";

const PREFERENCES_KEY = "chat_preferences";

const defaultPreferences = {
  theme: "light",
  fontSize: "medium",
  notificationsEnabled: true,
  messageGrouping: true,
  soundEnabled: true,
  timestampFormat: "12h",
};

export function usePreferences() {
  const [preferences, setPreferences] = useState(() => {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? JSON.parse(stored) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return {
    preferences,
    updatePreference,
    resetPreferences,
  };
}
