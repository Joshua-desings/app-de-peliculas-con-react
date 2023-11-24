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
        {handleButtonClick}
    </div>
  );
}

export default ThemeSwitcher;