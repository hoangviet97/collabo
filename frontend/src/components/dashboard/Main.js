import React from "react";
import Topbar from "./Topbar";
import Toolbar from "./Toolbar";
import MainContent from "./MainContent";
import Toolbox from "./../toolbox/Toolbox";

const Main = () => {
  return (
    <div className="main">
      <Topbar />
      <Toolbar />
      <MainContent />
      <Toolbox />
    </div>
  );
};

export default Main;
