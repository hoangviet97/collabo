import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { CalendarOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { deleteSession } from "../../actions/session";
import { useDispatch } from "react-redux";

interface Props {
  session: any;
  match: any;
}

const SessionPanelItem: FC<Props> = ({ session, match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();

  const deleteHandler = () => {
    dispatch(deleteSession({ id: session.id, project_id: params.id }));
  };

  return (
    <div className="session-item" style={{ backgroundColor: "#ecf0f1", padding: "10px 12px", borderRadius: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
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
      <div>
        <Button onClick={deleteHandler} type="text" icon={<CloseCircleOutlined />} />
      </div>
    </div>
  );
};

export default SessionPanelItem;
