import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;
