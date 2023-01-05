import React, { useState, useEffect, FC } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import SessionPanelList from "./SessionPanelList";
import moment from "moment";
import { useSelector, RootStateOrAny } from "react-redux";
import { session } from "../../../types/types";

interface Props {
  addNewSession: any;
}

const ControlPanel: FC<Props> = ({ addNewSession }) => {
  const [filteredSessions, setFilteredSessions] = useState([]);
  const sessions = useSelector((state: RootStateOrAny) => state.session.sessions);
  const sessionsLoading = useSelector((state: RootStateOrAny) => state.session.loading);
  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);

  useEffect(() => {
    showAllSessions();
  }, [sessions]);

  const showAllSessions = () => {
    const today = moment().format();
    const x = sessions.filter((item: session) => moment(item.date).isAfter(today) === true);
    setFilteredSessions(x);
  };

  const showPastSessions = () => {
    const today = moment().format();
    const x = sessions.filter((item: session) => moment(item.date).isAfter(today) === false);
    setFilteredSessions(x);
  };

  return (
    <div className="session__control-panel">
      <div className="meeting__control-header">
        <div className="meeting__control-filter">
          <div>
            <span style={{ fontSize: "20px", marginRight: "10px" }}>Sessions</span>
          </div>
          <div className="session__control-btns">
            <div>
              <Button className="session__control-btn" onClick={showAllSessions}>
                Active
              </Button>
              <Button className="session__control-btn" onClick={showPastSessions}>
                Past
              </Button>
            </div>
            <Button disabled={user_role === "Member" ? true : false} onClick={addNewSession}>
              <PlusOutlined />
            </Button>
          </div>
        </div>
      </div>
      <div className="meeting__control-content">{sessionsLoading ? <Skeleton /> : <SessionPanelList sessions={filteredSessions} />}</div>
    </div>
  );
};

export default ControlPanel;
