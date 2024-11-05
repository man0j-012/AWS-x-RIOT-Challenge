import React from 'react';
import styled from 'styled-components';
import SearchBox from './SearchBox';

const HomeContainer = styled.div`
  height: 100vh;
  background-image: url('https://frontofficesports.com/wp-content/uploads/2020/06/Beta-Key-Art_VALORANT-scaled.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const Header = styled.header`
  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: white;
  }

  p {
    font-size: 1.2rem;
    color: #ff4655;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const HomePage = ({ onSearch }) => {
  return (
    <HomeContainer>
      <Overlay>
        <Header>
          <h1>VALORANT Esports Digital Assistant</h1>
          <p>Powered by Amazon Bedrock</p>
        </Header>
        <MainContent>
          <SearchBox onSearch={onSearch} />
        </MainContent>
      </Overlay>
    </HomeContainer>
  );
};

export default HomePage;
