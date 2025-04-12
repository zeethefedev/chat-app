import React from 'react';
import { usePreferences } from '../hooks/usePreferences';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import Select from '../components/generics/Select';
import Button from '../components/generics/Button';

function Settings() {
  const { preferences, updatePreference, resetPreferences } = usePreferences();
  const { shortcuts } = useKeyboardShortcuts();

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12-hour' },
    { value: '24h', label: '24-hour' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="flex gap-4">
                  {['light', 'dark'].map(theme => (
                    <button
                      key={theme}
                      onClick={() => updatePreference('theme', theme)}
                      className={`
                        px-4 py-2 rounded-md capitalize
                        ${preferences.theme === theme
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Select
                  label="Font Size"
                  value={preferences.fontSize}
                  onChange={(e) => updatePreference('fontSize', e.target.value)}
                  options={fontSizeOptions}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.notificationsEnabled}
                    onChange={(e) => updatePreference('notificationsEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Sound Effects</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.soundEnabled}
                    onChange={(e) => updatePreference('soundEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Chat Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Group Messages by Date</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.messageGrouping}
                    onChange={(e) => updatePreference('messageGrouping', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div>
                <Select
                  label="Time Format"
                  value={preferences.timestampFormat}
                  onChange={(e) => updatePreference('timestampFormat', e.target.value)}
                  options={timeFormatOptions}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Keyboard Shortcuts</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {shortcuts.map(({ key, description }) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600">{description}</span>
                  <kbd className="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm text-sm">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button
            label="Reset to Defaults"
            onClick={resetPreferences}
            style={{
              backgroundColor: 'transparent',
              color: '#EF4444',
              border: '1px solid #EF4444'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;