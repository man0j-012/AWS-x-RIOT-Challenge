import styled, {keyframes} from "styled-components";

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Button = styled.button`
  background-color: #FF4F4F;
  border-radius: 5px;
  border: 2px solid #BF4F74;
  color: white;
  margin: 20px 20px 0 20px;
  padding: 10px 20px;
  font-size: 20px;
  height: 50px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
  animation: ${slideInFromLeft} 0.3s ease forwards;

  &:hover {
    background-color: #FF6969; 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); 
    transform: translateY(-2px); 
  }

  &:active{
    background-color: #E04C4C;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
  }
`;

export default Button;