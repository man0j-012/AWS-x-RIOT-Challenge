import styled from "styled-components";

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #ff4655;
  color: white;
  font-size: 1.2rem;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 63px;

  &:hover {
    background-color: #e53a47;
  }
`;

export default SearchButton;