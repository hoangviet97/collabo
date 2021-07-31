import React from "react";
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import SessionPanelList from "./SessionPanelList";

const ControlPanel = (props) => {
  return (
    <div className="meeting__control-panel" style={{ backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", width: "450px", borderRadius: "12px", overflowY: "scroll" }}>
      <div className="meeting__control-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div class="meeting__control-filter" style={{ display: "flex", gap: "5px" }}>
          <span style={{ fontSize: "20px", marginRight: "10px" }}>Sessions</span>
          <Button>All</Button>
          <Button>Today</Button>
          <Button type="text">
            <CalendarOutlined />
          </Button>
        </div>
        <div className="meeting-header-btns">
          <Button onClick={props.addNewSession}>
            <PlusOutlined />
          </Button>
        </div>
      </div>
      <div class="meeting__control-content">
        <SessionPanelList sessions={props.sessions} project_id={props.project_id} match={props.match} />
      </div>
    </div>
  );
};

export default ControlPanel;
