import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import TaskModal from "../modal/TaskModal";
import MainContent from "./MainContent";
import Toolbox from "../toolbox/Toolbox";
import Topbar from "../topbar/Topbar";
import { Route } from "react-router-dom";
import NewProject from "../projects/newProjectForm/NewProject";
import { io } from "socket.io-client";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import SocketContext from "../../context/SocketContext";
import { getAllInvitations, addInvitation } from "../../actions/invitation";
import { notification } from "antd";

const Dashboard: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const socket = io("https://collaboatbe.herokuapp.com");
  const profile = useSelector((state: RootStateOrAny) => state.auth.user);

  useEffect(() => {
    // fetch invitations for sidebar
    dispatch(getAllInvitations());
    // store client to arr in backend when user connect
    socket.emit("client-connect", profile.email);
    // listen to show notification and increase num sidebar
    socket.on("increment-unread", (data) => {
      notification.open({
        message: "Project invitation",
        description: "You have been invited to project."
      });
      dispatch(addInvitation(data));
    });
  }, []);

  return (
    <div className="dashboard">
      <SocketContext.Provider value={socket}>
        <Sidebar />
        <div className="content-side">
          <Topbar />
          <MainContent />
          <Toolbox />
          <TaskModal />
        </div>
        <Route path="/projects/new" component={NewProject} />
      </SocketContext.Provider>
    </div>
  );
};

export default Dashboard;
