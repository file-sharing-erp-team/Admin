import styled from "@emotion/styled";

export const BreadcrumbsContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  margin-left: -1rem;
`;

export const Crumb = styled.div`
  padding: 1rem 1rem;
  cursor: pointer;
  color: black;
  :hover {
    color: white;
    background-color: lightgray;
    transition-duration: 0.1s;
  }
`;
