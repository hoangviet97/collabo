import React, { FC } from "react";
import { getTypeColor } from "../../helpers/log";
import { Avatar } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import moment from "moment";

interface Props {
  data: any;
}

const ActivityItem: FC<Props> = ({ data }) => {
  return (
    <div className="log" style={{ marginBottom: "30px" }}>
      <header style={{ marginBottom: "20px" }}>
        <div className="log__type" style={{ color: getTypeColor(data.type) }}>
          {data.type}
        </div>
      </header>
      <div className="activity__body">
        <div className="activity__avatar">
          <Avatar style={{ backgroundColor: data.color === null || data.color.length < 1 ? "#f39c12" : data.color }} size={50}>
            <AvatarIcon firstname={data.firstname} lastname={data.lastname} size={20} />
          </Avatar>
        </div>
        <div className="activity__content">
          <div style={{ marginBottom: "30px" }}>
            <span style={{ fontWeight: "bolder" }}>
              {data.firstname} {data.lastname}{" "}
            </span>
            <span>{data.text}</span> <span style={{ color: getTypeColor(data.type) }}>{data.title}</span>
            <div>{moment(data.created_at).calendar()}</div>
          </div>
          {data.comment && (
            <div className="activity__comment">
              <div className="activity__comment-text">{data.comment}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
