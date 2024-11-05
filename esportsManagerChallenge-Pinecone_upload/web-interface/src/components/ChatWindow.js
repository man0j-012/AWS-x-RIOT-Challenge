import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import ChatWindowContainer from './ChatWindowContainer';
import MessagesContainer from './MessagesContainer';
import Message from './Messages';
import NewChat from './NewChat';
import Loader from './Loader';
import Footer from './Footer';

const ChatInterface = ({ messages, onNewChatClick, onFooterVisible }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [newChatClicked, setIsNewChatClicked] = useState(true);
  const [newMessages, setNewMessages] = useState(messages);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewChatClick = () => {
    onNewChatClick();
    setIsSearchActive(true);
    setIsNewChatClicked(false);
    setNewMessages([]);
  };

  const handleSearchComplete = async (searchText) => {
    const userMessage = { sender: 'user', text: searchText };
    setNewMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_message: searchText, top_k: 5 }), // Adjust the payload
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from backend');
      }

      const data = await response.json();

      // Format the bot's response
      const botReply = data.results.map((result, idx) => (
        <div key={idx}>
          <strong>{result.metadata.name}</strong> ({result.metadata.handle})<br />
          Kills: {result.metadata.total_kills_2024}<br />
          Region: {result.metadata.region}
        </div>
      ));

      setNewMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botReply },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setNewMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setIsLoading(false);
      setIsSearchActive(false);
      setIsNewChatClicked(true);
      onFooterVisible(true);
    }
  };

  const handleSendMessage = async (message) => {
    setNewMessages((prevMessages) => [...prevMessages, { sender: 'user', text: message }]);
    setIsLoading(true);

    try {
        const response = await fetch('http://127.0.0.1:8000/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_message: message }),
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Backend response:', data); // Log the response to verify

        const botReply = data.results.map(
            (match) =>
                `Name: ${match.metadata.name}, Agent: ${match.metadata.most_played_agent_name}, Region: ${match.metadata.region}`
        ).join('\n');

        setNewMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: botReply },
        ]);
    } catch (error) {
        console.error('Error:', error);
        setNewMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Sorry, something went wrong.' },
        ]);
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <>
      <Button onClick={handleNewChatClick}>
        New Chat
        <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ marginLeft: '10px' }} />
      </Button>
      {newChatClicked && (
        <>
          <ChatWindowContainer>
            <MessagesContainer>
              {newMessages.map((message, index) => (
                <Message key={index} sender={message.sender}>
                  {typeof message.text === 'string' ? message.text : message.text}
                </Message>
              ))}
              {isLoading && <Loader />}
            </MessagesContainer>
          </ChatWindowContainer>
          <Footer onSendMessage={handleSendMessage} />
        </>
      )}
      {isSearchActive && (
        <NewChat
          onSearchComplete={handleSearchComplete}
        />
      )}
    </>
  );
};

export default ChatInterface;