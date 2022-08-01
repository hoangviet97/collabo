import React, { FC } from "react";
import { getTypeColor } from "../../helpers/log";
import { Avatar, Divider } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import moment from "moment";
import color from "../../styles/abstract/variables.module.scss";

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
        <div style={{ float: "left", clear: "both", marginRight: "15px" }}>
          <Avatar style={{ backgroundColor: data.color === null || data.color.length < 1 ? color.normal_orange : data.color }} size={50}>
            <AvatarIcon firstname={data.firstname} lastname={data.lastname} size={20} />
          </Avatar>
        </div>
        <div>
          <div>
            <span style={{ fontWeight: "bolder" }}>
              {data.firstname} {data.lastname}{" "}
            </span>
            {data.text} {data.title}
          </div>
          <div>{data.comment}</div>
          <div>{moment(data.created_at).calendar()}</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
