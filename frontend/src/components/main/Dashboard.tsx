import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import TaskModal from "../modal/TaskModal";
import MainContent from "./MainContent";
import Toolbox from "../toolbox/Toolbox";
import Topbar from "../topbar/Topbar";
import { Route } from "react-router-dom";
import NewProject from "../projects/newProjectForm/NewProject";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content-side">
        <Topbar />
        <MainContent />
        <Toolbox />
        <TaskModal />
      </div>
      <Route path="/projects/new" component={NewProject} />
    </div>
  );
};

export default Dashboard;