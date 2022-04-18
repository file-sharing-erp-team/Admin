import React, { ChangeEventHandler } from "react";
import styled from "@emotion/styled";
import InputMask from "react-input-mask";

enum InputSize {
  large = "large",
}

interface InputProps {
  defaultValue?: string;
  size?: InputSize;
  placeholder?: string;
  disabled?: boolean;
  style?: object;
  mask?: string;
  error?: boolean;
  type?: string;
  multiple?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const StyledInput = styled(InputMask)`
  border: 1px solid lightgray;
  margin: 0.8rem auto;
  background-color: #f0f0f0;
  padding: 0.5rem 0.5rem;
  border-radius: 4px;
  &:focus {
    background-color: white;
    outline: 1px solid #0000ff !important;
  }

  &.large {
    width: 60%;
  }

  &.error {
    background-color: white;
    outline: 1px solid red !important;
  }
`;

const Input: React.FC<InputProps> = ({
  defaultValue = "",
  size = "large",
  placeholder = "",
  disabled = false,
  style,
  mask = "",
  error = false,
  type,
  onChange,
  multiple = false,
  children,
}) => {
  const hasError = error ? "error" : "";

  return (
    <StyledInput
      type={type}
      className={size + " " + hasError}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      mask={mask}
      multiple={multiple}
      onChange={onChange}
    />
  );
};

export default Input;
