// components/MessageCard.tsx
import React from "react";
import styled from "styled-components";

interface MessageCardProps {
  message: string;
  onClose: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onClose }) => {
  return (
    <CardContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <MessageContent>{message}</MessageContent>
    </CardContainer>
  );
};

export default MessageCard;

// Styled Components
const CardContainer = styled.div`
  position: relative;
  background-color: #1e1e1e;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

const MessageContent = styled.p`
  font-size: 16px;
  margin: 0;
`;
