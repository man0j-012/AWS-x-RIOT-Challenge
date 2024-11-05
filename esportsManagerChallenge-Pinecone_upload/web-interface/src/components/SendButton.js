import styled from 'styled-components';

const SendButton = styled.button`
  padding: 12px 25px;
  background-color: #ff4655;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  position: absolute;
  right: 36px;

  &:hover {
    background-color: #e53a47;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default SendButton;