import React from "react";
import styled from "@emotion/styled";
import { Ellipsis } from "react-spinners-css";

interface LoaderProps {
  isLoading: boolean;
}

const StyledLoader = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader: React.FC<LoaderProps> = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <>
          <StyledLoader>
            <Ellipsis color={"#000000"} />
          </StyledLoader>
        </>
      ) : null}
    </>
  );
};

export default Loader;
