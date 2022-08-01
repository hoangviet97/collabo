import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { CalendarOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { deleteSession } from "../../actions/session";
import { useDispatch } from "react-redux";
import { session } from "../../types/types";

interface Props {
  session: session;
  match?: any;
}

const SessionPanelItem: FC<Props> = ({ session, match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();

  const deleteHandler = () => {
    dispatch(deleteSession({ id: session.id, project_id: params.id }));
  };

  return (
    <div className="session-item" style={{ backgroundColor: "#f7dbca", padding: "10px 18px", borderRadius: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div className="session-item__title" style={{ marginBottom: "10px" }}>
          <Link to={`${match.url}/${session.id}`}>
            <span style={{ fontSize: "22px", color: "black" }}>{session.name}</span>
          </Link>
        </div>
        <div className="session__item__info">
          <div className="session__item__date">
            <CalendarOutlined style={{ color: "#2f3542" }} />
            <span style={{ fontSize: "13px", color: "#2f3542" }}>{moment(session.date).format("LL")}</span>
          </div>
          <div className="session-item__time" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <ClockCircleOutlined style={{ color: "#2f3542" }} />
            <span style={{ fontSize: "13px", color: "#2f3542" }}>
              {moment(session.start).format("LT")} - {moment(session.end).format("LT")}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={deleteHandler} type="text" icon={<CloseCircleOutlined />} />
      </div>
    </div>
  );
};

export default SessionPanelItem;
