import React from "react";
import Topbar from "./Topbar";
import Toolbar from "./Toolbar";
import MainContent from "./MainContent";

const Main = () => {
  return (
    <div className="main">
      <Topbar />
      <Toolbar />
      <MainContent />
    </div>
  );
};

export default Main;
