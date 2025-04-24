// src/frontend/src/pages/Settings.jsx
import React, { useState } from 'react';

// Styles for the Settings page with a dark modern theme
import './Settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`settings-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="settings-header">
        <h1>Settings</h1>
        <div className="theme-toggle">
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
          <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
      </div>
      <div className="settings-content">
        <h2>User Preferences</h2>
        <p>Manage your application settings here.</p>
        <div className="setting-item">
          <label>Email Notifications</label>
          <input type="checkbox" checked={true} />
        </div>
        <div className="setting-item">
          <label>Account Privacy</label>
          <input type="checkbox" checked={false} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
