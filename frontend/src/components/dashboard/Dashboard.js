import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { Route, Switch, Redirect } from "react-router-dom";
import NewProject from "./NewProject";

const Dashboard = (props) => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <Main />
        <Route path="/projects/new" component={NewProject} />
      </div>
    </>
  );
};

export default Dashboard;
