import React from "react";
import Sidebar from "../sidebar/Sidebar";
import TaskModal from "../modal/TaskModal";
import MainContent from "./MainContent";
import Toolbox from "../toolbox/Toolbox";
import Topbar from "../topbar/Topbar";
import { Route } from "react-router-dom";
import NewProject from "../projects/newProjectForm/NewProject";
import { useSelector, RootStateOrAny } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);

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
