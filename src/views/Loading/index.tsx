// PasswordPrompt.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingView = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading account data...</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingView;

// Loading View Styles
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #fff;
`;

// Spinner Animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 6px solid rgba(255, 255, 255, 0.2);
  border-top-color: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;
