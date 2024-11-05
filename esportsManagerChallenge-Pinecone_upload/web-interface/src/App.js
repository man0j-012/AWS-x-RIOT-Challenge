import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ChatWindow from './components/ChatWindow';
import Footer from './components/Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
  height: 100vh;
  transition: background-color 0.5s ease, height 0.5s ease;
  background-color: ${(props) => (props.chatStarted ? '#1D1F21;' : '#282c34')};
`;

const App = () => {
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  const handleSearch = async (searchText) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: searchText } 
    ]);
    setChatStarted(true);

    try {
      // Send request to the FastAPI backend
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: searchText,
          top_k: 5, // Adjust based on your needs
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from backend.');
      }

      const data = await response.json();

      // Handle the response from the backend
      const botReply = `Here are your results: ${JSON.stringify(data.results)}`;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botReply },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    }
  };

  const handleNewChatClick = () =>{
    setIsFooterVisible(false);
    setMessages([]);
  }

  const handleFooterVisible = () => {
    setIsFooterVisible(true);
  }

  return (
    <AppContainer chatStarted={chatStarted}>
      {!chatStarted ? (
        <HomePage onSearch={handleSearch} />
      ) : (
        <>
          <ChatWindow messages={messages} onNewChatClick={handleNewChatClick} onFooterVisible={handleFooterVisible}/>
        </>
      )}
    </AppContainer>
  );
};

export default App;
