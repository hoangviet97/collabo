import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { Route, Switch, Redirect } from "react-router-dom";
import NewProject from "./NewProject";
import { connect } from "react-redux";

const Dashboard = () => {
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Dashboard);
