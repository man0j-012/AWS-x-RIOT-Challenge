import styled, {keyframes} from "styled-components";

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-10px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 82vh;
  max-height: 82vh;
  background-color: #2E3238;;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  margin: 20px 20px 2px 20px;
  overflow-y: auto;
  animation: ${slideInFromLeft} 0.3s ease forwards;
`;

export default ChatWindowContainer;