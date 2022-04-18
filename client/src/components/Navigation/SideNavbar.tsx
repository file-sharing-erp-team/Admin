import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Header } from "../index";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineTeam } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { BsCalendarEvent } from "react-icons/bs";
import { HiLogin, HiLogout } from "react-icons/hi";
import { useTypeSelector } from "../../utils/hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../utils/context/AuthContext";
import { logOut } from "../../redux/actions";

const StyledSideNav = styled.div`
  width: 5rem;
  height: 100vh;

  animation: slidein 3s;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  .header {
    animation: text 1s;
    animation-fill-mode: forwards;
    margin-left: 150%;
    color: #bfcfff;
    width: 0;
  }

  .navs {
    animation: navs 1s;
    animation-delay: 2s;
    animation-fill-mode: backwards;
  }

  @keyframes text {
    from {
      display: block;
      opacity: 10;
      width: 100%;
      margin-left: 150%;
    }

    to {
      opacity: 0;
      transition: 2ms;
      margin-left: 0;
      width: 0;
    }
  }

  @keyframes navs {
    from {
      display: none;
      width: 0;
      content: none;
      overflow: hidden;
    }

    to {
      display: flex;
      opacity: 10;
      transition: 0.4s;
      width: 5rem;
    }
  }

  @keyframes slidein {
    from {
      justify-content: center;
      margin-right: 80%;
      width: 100%;
      height: 100vh;
    }

    to {
      margin-right: 0%;
      width: 5rem;
      height: 100vh;
    }
  }
`;

const NavButtons = styled.div`
  width: 5rem;
  height: 100vh;
  background-color: #8fabff;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  margin: 1rem 1rem;
`;

const SideNavbar = () => {
  const [width, setWidth] = useState("100vw");
  const [height, setHeight] = useState("100vh");
  const [width2, setWidth2] = useState("0vw");

  const [display, setDisplay] = useState("flex");

  const user = useTypeSelector((state) => state.user);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);

  const logout = () => {
    dispatch(logOut());
    auth.logout();
  };
  useEffect(() => {
    setWidth("7rem");
  }, []);

  return (
    <>
      <StyledSideNav className={"sidebar-animation"}>
        <Header
          className={"header"}
          style={{ color: "#8fabff", fontSize: "10rem" }}
        >
          Ecosystem
        </Header>

        <NavButtons className={"navs"}>
          <div
            style={{
              width: "5rem",
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
            }}
          >
            <StyledLink to={"/"}>
              <span
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                ECO
              </span>
            </StyledLink>
          </div>
          <div
            style={{
              width: "5rem",
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
              color: "white",
            }}
          >
            <StyledLink to={"/"}>
              <AiFillHome width={"5rem"} height={"5rem"} size={"1.7em"} />
            </StyledLink>
          </div>
          <div
            style={{
              width: "5rem",
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
              color: "white",
            }}
          >
            <StyledLink to={"/courses"}>
              <SiGoogleclassroom
                width={"5rem"}
                height={"5rem"}
                size={"1.7em"}
              />
            </StyledLink>
          </div>
          <div
            style={{
              width: "5rem",
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
              color: "white",
            }}
          >
            <StyledLink to={"/schedule"}>
              <BsCalendarEvent width={"5rem"} height={"5rem"} size={"1.7em"} />
            </StyledLink>
          </div>
          <div
            style={{
              width: "5rem",
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
              color: "white",
            }}
          >
            <StyledLink to={"/about"}>
              <AiOutlineTeam width={"5rem"} height={"5rem"} size={"1.7em"} />
            </StyledLink>
          </div>
          <div
            style={{
              width: "5rem",
              display: "flex",
              justifyContent: "center",
              margin: "650% 0",
              color: "white",
            }}
          >
            {user["isAuth"] ? (
              <span style={{ cursor: "pointer" }} onClick={logout}>
                <HiLogout width={"5rem"} height={"5rem"} size={"1.7em"} />
              </span>
            ) : (
              <StyledLink to={"/login"}>
                <HiLogin width={"5rem"} height={"5rem"} size={"1.7em"} />
              </StyledLink>
            )}
          </div>
        </NavButtons>
      </StyledSideNav>
    </>
  );
};

export default SideNavbar;
