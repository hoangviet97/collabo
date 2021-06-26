import React from "react";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
import SessionPanelList from "./SessionPanelList";

const ControlPanel = (props) => {
  return (
    <div className="meeting__control-panel" style={{ backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", flexGrow: 1, borderRadius: "12px" }}>
      <div class="meeting__control-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>Sessions</span>
        <div class="meeting-header-btns">
          <Button onClick={props.addNewSession}>
            <PlusOutlined />
          </Button>
          <Button style={{ padding: "0 5px", border: "none", fontSize: "20px" }}>
            <MoreOutlined />
          </Button>
        </div>
      </div>
      <div class="meeting__control-content">
        <SessionPanelList />
      </div>
    </div>
  );
};

export default ControlPanel;
