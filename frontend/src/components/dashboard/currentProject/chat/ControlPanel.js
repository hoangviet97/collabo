import React, { useState } from "react";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ChannelList from "./ChannelList";

const ControlPanel = (props) => {
  const [channelsVisibility, setChannelsVisibility] = useState(true);

  return (
    <div className="meeting__control-panel" style={{ backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", flex: "0 0 250px", borderRadius: "12px" }}>
      <div className="meeting__control-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
        <div className="channel__dropdown-header" onClick={() => setChannelsVisibility((prev) => !prev)} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <RightOutlined style={{ fontSize: "10px" }} />
          <span>Channels</span>
        </div>
        <Button type="link" style={{ padding: "0px" }} onClick={props.addNewChannel}>
          <PlusOutlined style={{ fontSize: "15px" }} />
        </Button>
      </div>
      {channelsVisibility && (
        <div className="meeting__control-content">
          <ChannelList projectId={props.projectId} />
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
