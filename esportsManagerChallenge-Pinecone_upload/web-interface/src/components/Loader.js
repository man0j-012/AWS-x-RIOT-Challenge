import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
`;

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const LoaderDot = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: #3498db;
  animation: ${pulse} 1.5s infinite;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; 
`;

const DotContainer = styled.div`
  display: flex;
`;

const SearchingText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  animation: ${fadeInOut} 2s ease-in-out infinite;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <DotContainer>
          <LoaderDot style={{ animationDelay: "0s" }} />
          <LoaderDot style={{ animationDelay: "0.3s" }} />
          <LoaderDot style={{ animationDelay: "0.6s" }} />
        </DotContainer>
        <SearchingText>Searching...</SearchingText>
      </LoaderWrapper>
    </LoaderContainer>
  );
};

export default Loader;