import React, { FC } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

interface Props {
  session: any;
  match: any;
}

const SessionPanelItem: FC<Props> = ({ session, match }) => {
  return (
    <div className="session-item" style={{ backgroundColor: "#ecf0f1", padding: "10px 12px", borderRadius: "10px", marginBottom: "10px" }}>
      <div className="session-item__title">
        <Link to={`${match.url}/${session.id}`}>
          <span style={{ fontSize: "20px" }}>{session.name}</span>
        </Link>
      </div>
      <div className="session-item__date" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <CalendarOutlined />
        <span>{moment(session.date).format("LL")}</span>
      </div>
      <div className="session-item__time" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <ClockCircleOutlined />
        {moment(session.start).format("LT")} - {moment(session.end).format("LT")}
      </div>
    </div>
  );
};

export default SessionPanelItem;
