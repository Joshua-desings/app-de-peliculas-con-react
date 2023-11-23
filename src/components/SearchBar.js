import React, { useState } from 'react';
import { useDebouncedEffect } from '../utils/debounce';

const SearchBar = ({ onSearch }) => {
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
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Buscar películas..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
