import React, { useRouteMatch } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/cs";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

const SessionPanelItem = ({ session, match }) => {
  //let { sessionid } = useParams();

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
