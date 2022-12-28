import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { CalendarOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { deleteSession } from "../../../actions/session";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { session } from "../../../types/types";

interface Props {
  session: session;
  match?: any;
}

const SessionPanelItem: FC<Props> = ({ session, match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);

  const deleteHandler = () => {
    dispatch(deleteSession(session.id, params.id));
  };

  return (
    <div className="session__panel-item">
      <div>
        <div className="session-item__title" style={{ marginBottom: "10px" }}>
          <Link to={`${match.url}/${session.id}`}>
            <span style={{ fontSize: "22px", color: "black" }}>{session.name}</span>
          </Link>
        </div>
        <div className="session__item__info">
          <div className="session__panel-datetime">
            <CalendarOutlined className="session__panel-icon" />
            <span style={{ fontSize: "13px", color: "#2f3542" }}>{moment(session.date).format("MMM Do YY")}</span>
          </div>
          <div className="session__panel-datetime">
            <ClockCircleOutlined className="session__panel-icon" />
            <span style={{ fontSize: "13px", color: "#2f3542" }}>
              {moment(session.start).format("LT")} - {moment(session.end).format("LT")}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Button disabled={user_role === "Member" ? true : false} onClick={deleteHandler} type="text" icon={<CloseCircleOutlined />} />
      </div>
    </div>
  );
};

export default SessionPanelItem;
