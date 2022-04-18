import React, { MouseEventHandler } from "react";
import styled from "@emotion/styled";

interface CheckboxProps {
  onClick: MouseEventHandler<HTMLInputElement>;
}

const StyledCheckbox = styled.input`
  position: relative;
  width: 1.5em;
  height: 1.5em;
  color: black;
  border: 1px solid gray;
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  &::before {
    position: absolute;
    content: "";
    display: block;
    top: 2px;
    left: 7px;
    width: 8px;
    height: 14px;
    border-style: solid;
    border-color: white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: white;
    border-color: #0000ff;
    background: #0000ff;
    &::before {
      opacity: 1;
    }
    ~ label::before {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
`;

const StyledLabel = styled.label`
  position: relative;
  cursor: pointer;
  padding: 0 0.25em 0;
  user-select: none;
`;

const StyledDiv = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: start;
  justify-self: start;
`;

const Checkbox: React.FC<CheckboxProps> = ({ onClick, children }) => {
  return (
    <StyledDiv>
      <StyledCheckbox type={"checkbox"} onClick={onClick} />
      <StyledLabel>{children}</StyledLabel>
    </StyledDiv>
  );
};

export default Checkbox;
