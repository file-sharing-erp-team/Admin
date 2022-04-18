import React from "react";
import { Navbar } from "../components";
import PageContainer from "../components/PageContainer/PageContainer";
import SideNavbar from "../components/Navigation/SideNavbar";

const HomePage = () => {
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <SideNavbar />
      <PageContainer></PageContainer>
    </div>
  );
};

export default HomePage;
