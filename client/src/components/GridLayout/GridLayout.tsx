import React from "react";
import styled from "@emotion/styled";

export type GridProps = {
  items?: Array<React.ReactNode>;
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem 2rem;
  grid-auto-rows: minmax(100psx, auto);
`;

const StyledItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-column: auto;
  grid-row: auto;
`;

const Grid: React.FC<GridProps> = ({ items = [], children }) => {
  return (
    <StyledGrid>
      {items?.length > 0 &&
        items.map((item, index) => {
          return <StyledItem key={index}>{item}</StyledItem>;
        })}
    </StyledGrid>
  );
};

export default Grid;
