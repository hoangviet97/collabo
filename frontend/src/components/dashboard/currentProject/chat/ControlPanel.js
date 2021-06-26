import React from "react";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ControlPanel = (props) => {
  return (
    <div className="meeting__control-panel" style={{ backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", flex: "0 0 250px", borderRadius: "12px" }}>
      <div class="meeting__control-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div class="channel__dropdown-header" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <RightOutlined style={{ fontSize: "10px" }} />
          <span>Channels</span>
        </div>
        <Button type="link" style={{ padding: "0px" }} onClick={props.addNewChannel}>
          <PlusOutlined style={{ fontSize: "15px" }} />
        </Button>
      </div>
      <div class="meeting__control-content"></div>
    </div>
  );
};

export default ControlPanel;
