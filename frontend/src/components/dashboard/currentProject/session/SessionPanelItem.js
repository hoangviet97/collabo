import React from "react";
import moment from "moment";
import "moment/locale/cs";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

const SessionPanelItem = ({ session }) => {
  return (
    <div className="meeting-panel__item" style={{ backgroundColor: "#ecf0f1", padding: "10px 12px", borderRadius: "10px", marginBottom: "10px" }}>
      <div className="meeting-panel__title">
        <span style={{ fontSize: "20px" }}>{session.name}</span>
      </div>
      <div className="meeting-panel__date" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <CalendarOutlined />
        <span>{moment(session.date).format("LL")}</span>
      </div>
      <div className="meeting-panel__time" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <ClockCircleOutlined />
        {moment(session.start).format("LT")} - {moment(session.end).format("LT")}
      </div>
    </div>
  );
};

export default SessionPanelItem;
