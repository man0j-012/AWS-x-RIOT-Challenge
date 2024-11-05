import styled from "styled-components";

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  margin-right: 10px;
  outline: none;
  transition: border-color 0.2s;
  height: 30px;
  background-color: #3C4043;
  color: white;

  &:focus {
    border-color: #FF4C4C; 
    box-shadow: 0 0 5px rgba(255, 76, 76, 0.5);
  }
`;

export default Input;