import React, { useState } from 'react';
import SendButton from './SendButton';
import FooterContainer from './FooterContainer';
import Input from './Input';

const Footer = ({onSendMessage}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleSend = async () => {
    if (inputText.trim()) {
      setIsLoading(true); 
      await onSendMessage(inputText);
      setInputText(''); 
      setIsLoading(false); 
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <FooterContainer>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      />
      <SendButton onClick={handleSend}>Send</SendButton>
    </FooterContainer>
  );
};

export default Footer;
