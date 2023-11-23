// ThemeSwitcher.js
import React, { useState } from 'react';

const ThemeSwitcher = ({ onThemeChange }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    onThemeChange(newTheme ? 'dark' : 'light');
  };

  const handleButtonClick = () => {
    toggleTheme();
  };

  return (
    <div className={`theme-switcher ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <label className="theme-switcher-label"></label>
      <button
        className={`theme-switch-button ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}
        style={{ backgroundColor: 'green', color: 'white' }}
        onClick={handleButtonClick}
      >
        {isDarkTheme ? 'Cambia a modo claro' : 'Cambia a modo oscuro'}
      </button>
    </div>
  );
}

export default ThemeSwitcher;