import React, { useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Main from "./Main";
import { Route } from "react-router-dom";
import NewProject from "./newProjectForm/NewProject";
import TaskModal from "../modal/TaskModal";
import { connect } from "react-redux";
import { getProjects } from "../../actions/project";

const Dashboard = (props) => {
  useEffect(() => {
    props.getProjects();
  }, []);

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <Main />
        <Route path="/projects/new" component={NewProject} />
        <TaskModal />
      </div>
    </>
  );
};

export default connect(null, { getProjects })(Dashboard);
