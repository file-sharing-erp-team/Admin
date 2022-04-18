import React from "react";
import styled from "@emotion/styled";
import { Navbar } from "../components";
import PageContainer from "../components/PageContainer/PageContainer";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import SideNavbar from "../components/Navigation/SideNavbar";

const AboutPage = () => {
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <SideNavbar />
      <PageContainer>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Header>About Ecosystem</Header>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Header style={{ fontSize: "1.5rem", fontWeight: "normal" }}>
            Study everywhere
          </Header>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
          }}
        >
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <img
                width={"75%"}
                src={"assets/filesharing.png"}
                alt={"maksim"}
              />
              <Header>Mihail Toropchinov</Header>
              <Header style={{ fontSize: "1.3rem", fontWeight: "normal" }}>
                back-end dev
              </Header>
              <Header
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "normal",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                <a href={"https://github.com/ruhose73"}>Github</a>
              </Header>
            </div>
            <div
              style={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <img
                width={"75%"}
                src={"assets/filesharing.png"}
                alt={"maksim"}
              />
              <Header>Maksim Dmitriev</Header>
              <Header style={{ fontSize: "1.3rem", fontWeight: "normal" }}>
                front-end dev
              </Header>
              <Header
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "normal",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                <a href={"https://github.com/sigarachi"}>Github</a>
              </Header>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default AboutPage;
