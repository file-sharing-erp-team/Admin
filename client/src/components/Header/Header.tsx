import React, { ClassType } from "react";
import styled from "@emotion/styled";

interface HeaderProps {
  style?: object;
  className?: string;
}

const StyledHeader = styled.h1`
  font-weight: bold;
  font-size: 43px;
`;

const Header: React.FC<HeaderProps> = ({ style, className, children }) => {
  return (
    <StyledHeader className={className} style={style}>
      {children}
    </StyledHeader>
  );
};

export default Header;
