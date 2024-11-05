import styled, {keyframes} from 'styled-components';

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

const FooterContainer = styled.div`
  display: flex;
  padding: 15px 20px;
  background-color: #2E3238;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
  align-items: center;
  border-radius: 10px;
  width: 100%
  position: fixed;
  margin: 0 20px;
  bottom: 0;
  animation: ${slideInFromLeft} 0.3s ease forwards;
`;

export default FooterContainer;