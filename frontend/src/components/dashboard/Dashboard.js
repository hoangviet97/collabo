import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { connect } from "react-redux";
import NewProject from "./NewProject";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <Main />
      </div>
    </>
  );
};

export default Dashboard;
