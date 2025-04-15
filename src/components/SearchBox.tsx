
import React, { useState, ChangeEvent } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  onSearch, 
  placeholder = "Search Pokémon..." 
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative mb-6 w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg 
          className="w-5 h-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
      <input
        type="text"
        className="search-input pl-10"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button
          className="absolute right-3 inset-y-0 flex items-center"
          onClick={() => {
            setQuery('');
            onSearch('');
          }}
          aria-label="Clear search"
        >
          <svg 
            className="w-5 h-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBox;
