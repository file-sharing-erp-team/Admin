import React, { useContext } from "react";
import { LogoText, MainNav, NavItem, StyledLogo, StyledNavbar } from "./styles";
import { useTypeSelector } from "../../utils/hooks/useTypeSelector";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../utils/context/AuthContext";
import { logOut } from "../../redux/actions";

const Navbar: React.FC = ({ children }) => {
  const user = useTypeSelector((state) => state.user);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);

  const logout = () => {
    dispatch(logOut());
    auth.logout();
  };

  return (
    <StyledNavbar>
      <StyledLogo>
        <LogoText>
          <Link to={"/"}>Ecosystem</Link>
        </LogoText>
      </StyledLogo>
      <MainNav>
        <NavItem>
          <Link to={"/"}>Main</Link>
        </NavItem>
        <NavItem>
          <Link to={"/courses"}>Courses</Link>
        </NavItem>
        <NavItem>
          <Link to={"/schedule"}>Schedule</Link>
        </NavItem>
        <NavItem>
          <Link to={"/about"}>About</Link>
        </NavItem>
        <NavItem>
          {user["isAuth"] ? (
            <Link to={"/login"}>LogIn</Link>
          ) : (
            <span onClick={logout}>Logout</span>
          )}
        </NavItem>
      </MainNav>
    </StyledNavbar>
  );
};

export default Navbar;
