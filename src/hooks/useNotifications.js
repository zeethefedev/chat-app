import { useEffect, useCallback } from 'react';
import { usePreferences } from './usePreferences';

export function useNotifications() {
  const { preferences } = usePreferences();

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }, []);

  const showNotification = useCallback((title, options = {}) => {
    if (!preferences.notificationsEnabled) return;
    
    if (Notification.permission === 'granted' && document.hidden) {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        ...options
      });

      if (preferences.soundEnabled) {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(err => console.warn('Could not play notification sound:', err));
      }

      return notification;
    }
  }, [preferences.notificationsEnabled, preferences.soundEnabled]);

  useEffect(() => {
    if (preferences.notificationsEnabled) {
      requestPermission();
    }
  }, [preferences.notificationsEnabled, requestPermission]);

  return {
    requestPermission,
    showNotification
  };
}