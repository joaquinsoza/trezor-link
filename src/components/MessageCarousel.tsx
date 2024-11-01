// components/MessageCarousel.tsx
import React, { useState } from "react";
import styled from "styled-components";
import MessageCard from "./MessageCard";

interface MessageCarouselProps {
  messages: { id: number; text: string }[];
  onCloseMessage: (id: number) => void;
}

const MessageCarousel: React.FC<MessageCarouselProps> = ({
  messages,
  onCloseMessage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer>
      <MessageCard
        message={messages[currentIndex].text}
        onClose={() => onCloseMessage(messages[currentIndex].id)}
      />
      {messages.length > 1 && (
        <Navigation>
          <NavButton onClick={handlePrev}>&lt;</NavButton>
          <Dots>
            {messages.map((_, index) => (
              <Dot
                key={index}
                active={index === currentIndex}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </Dots>
          <NavButton onClick={handleNext}>&gt;</NavButton>
        </Navigation>
      )}
    </CarouselContainer>
  );
};

export default MessageCarousel;

// Styled Components
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.span<{ active: boolean }>`
  width: ${(props) => (props.active ? "12px" : "8px")};
  height: 8px;
  background-color: ${(props) => (props.active ? "#fff" : "#888")};
  border-radius: 4px;
  margin: 0 4px;
  cursor: pointer;
`;
