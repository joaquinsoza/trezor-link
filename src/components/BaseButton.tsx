import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: #bf4f74;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: white;
    color: #bf4f74;
  }
`;

interface BaseButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  width?: string;
}

export const BaseButton = ({
  onClick,
  size,
  width,
  children,
  disabled,
}: BaseButtonProps) => {
  const newHeight = () => {
    switch (size) {
      case "sm":
        return "15px";
      case "md":
        return "25px";
      case "lg":
        return "45px";
      case "xl":
        return "65px";

      default:
        "25px";
    }
  };

  return (
    <StyledButton
      style={{ width: width, height: newHeight() }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};
