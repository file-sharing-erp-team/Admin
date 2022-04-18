import React from "react";
import { StyledContainer } from "./styles";

const PageContainer: React.FC = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default PageContainer;
