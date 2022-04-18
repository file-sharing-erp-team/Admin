import React, { MouseEventHandler } from "react";
import styled from "@emotion/styled";

export enum ButtonVariant {
  outlined = "outlined",
  primary = "primary",
  text = "text",
}

export enum ButtonSize {
  regular = "regular",
  large = "large",
}

interface ButtonProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  style?: object;
  onClick?: MouseEventHandler;
}

const StyledButton = styled.button`
  padding: 0.4rem 0.4rem;
  border-radius: 9px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer !important;
  z-index: 10;

  &.primary {
    background: #0000ff;
    color: white;
  }

  &.primary:hover {
    background: #002db3;
    color: white;
    transition-duration: 0.2s;
  }

  &.outlined {
    background: white;
    color: #0000ff;
    border: 1px solid #0000ff;
  }

  &.outlined:hover {
    background: #002db3;
    color: white;
    transition-duration: 0.2s;
  }

  &.text {
    color: #0000ff;
    cursor: pointer;
  }

  &.text:hover {
    color: #0000ff;
    background-color: #bfcfff;
    transition-duration: 0.2s;
    cursor: pointer;
  }

  &.regular {
    width: 9rem;
    height: 3rem;
  }

  &.large {
    width: 12rem;
    height: 3rem;
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant,
  size = ButtonSize.regular,
  style,
  onClick,
  children,
}) => {
  return (
    <StyledButton
      className={variant + " " + size}
      style={style}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
