import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { Route, Switch } from "react-router-dom";
import NewProject from "./NewProject";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <Main />
        <Switch>
          <Route path="/projects/new" component={NewProject} />
        </Switch>
      </div>
    </>
  );
};

export default Dashboard;
