import styled from "styled-components";

const Message = styled.div`
  display: inline-block;
  margin: 10px 0;
  padding: 16px 16px;
  border-radius: 15px;
  max-width: 75%;
  font-size: 1rem;
  line-height: 1.5;
  background-color: ${(props) => (props.sender === 'user' ? '#F5F5F7' : '#f1f1f1')};
  color: ${(props) => (props.sender === 'user' ? 'black' : '#333')};
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export default Message;