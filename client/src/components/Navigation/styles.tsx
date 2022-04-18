import styled from "@emotion/styled";

export const StyledNavbar = styled.nav`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 1rem 2rem;
`;

export const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

export const MainNav = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

export const NavItem = styled.li`
  cursor: pointer;
  font-size: 1rem;
  font-weight: normal;

  :hover {
    color: #bfcfff;
    transition-duration: 0.2s;
  }
`;
