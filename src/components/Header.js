import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { useDebouncedEffect } from '../utils/debounce';

const Header = ({ onThemeChange, onSearch }) => {
  const [query, setQuery] = useState('');

  // Llamamos a la función onSearch después de un retraso de 300 ms
  useDebouncedEffect(() => {
    onSearch(query);
  }, [query], 300);
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="header">
        <h1>Películas</h1>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <ThemeSwitcher onThemeChange={onThemeChange} />
    </div>
  );
};

export default Header;
