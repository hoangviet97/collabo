import React from "react";
import Topbar from "./Topbar";
import MainContent from "./MainContent";
import Toolbox from "./../toolbox/Toolbox";

const Main = () => {
  return (
    <div className="main">
      <Topbar />
      <MainContent />
      <Toolbox />
    </div>
  );
};

export default Main;
