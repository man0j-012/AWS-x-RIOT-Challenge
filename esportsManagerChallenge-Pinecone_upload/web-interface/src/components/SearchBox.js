import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchContainer from './SearchContainer';
import SearchButton from './SearchButton';

const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <div>
        <h2>Ask Anything About Your Favorite VALORANT Players & Teams</h2>
        <SearchBar
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search VALORANT players, stats, or teams..."
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </div>

    </SearchContainer>
  );
};

export default SearchBox;
