import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Main from "./Main";
import { Route } from "react-router-dom";
import NewProject from "./newProjectForm/NewProject";
import TaskModal from "../modal/TaskModal";

const Dashboard = () => {
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

export default Dashboard;
