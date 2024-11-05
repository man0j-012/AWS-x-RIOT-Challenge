import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';
import styled, {keyframes} from 'styled-components';
import Loader from './Loader';

const fadeInScale = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const NewChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
    animation: ${fadeInScale} 0.6s ease forwards;
`;

const H2 = styled.div`
    color: white;
    font-weight: 700;
    font-size: 30px;
    text-align: center;
    padding: 40px;
`;

const NewChat = ({ onSearchComplete }) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchText.trim()) {
      setIsLoading(true); 
      await onSearchComplete(searchText); 
      setIsLoading(false); 
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <NewChatContainer>
      <div style={{marginBottom: '50px'}}>
        <H2>Ask Anything About Your Favorite VALORANT Players & Teams</H2>
        <SearchBar
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search VALORANT players, stats, or teams..."
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </div>
      {isLoading && <Loader/>}
    </NewChatContainer>
  );
};

export default NewChat;
