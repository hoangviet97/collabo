import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { getAllInvitations } from "../../actions/invitation";
import { notification } from "antd";

const Dashboard = () => {
  const dispatch = useDispatch();
  const socket = io("http://localhost:9000");
  const profile = useSelector((state: RootStateOrAny) => state.auth.user);
  const unread = useSelector((state: RootStateOrAny) => state.invitation.unread);
  const [unreadNum, setUnreadNum] = useState(0);

  useEffect(() => {
    dispatch(getAllInvitations());
    socket.emit("client-connect", profile.email);
    socket.on("increment-unread", () => {
      notification.open({
        message: "Project invitation",
        description: "You have been invited to project."
      });
      setUnreadNum((prev) => prev + 1);
    });
  }, []);

  useEffect(() => {
    setUnreadNum(unread);
  }, [unread]);

  return (
    <div className="dashboard">
      <SocketContext.Provider value={socket}>
        <Sidebar unread={unreadNum} />
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
