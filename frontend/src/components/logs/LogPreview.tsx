import React, { FC } from "react";
import AvatarIcon from "../utils/AvatarIcon";
import { Avatar } from "antd";
import moment from "moment";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  data: any;
}

const LogPreview: FC<Props> = ({ data }) => {
  return (
    <div className="log__preview text-ellipsis" style={{ width: "100%" }}>
      <Avatar style={{ backgroundColor: data.color === null || data.color.length < 1 ? color.normal_orange : data.color }}>
        <AvatarIcon firstname={data.firstname} lastname={data.lastname} size={17} />
      </Avatar>
      <div className="log__preview-content">
        <div>
          <span style={{ fontWeight: "bolder" }}>
            {data.firstname} {data.lastname}{" "}
          </span>
          {data.text}
        </div>
        <div style={{ color: color.normal_silver_2 }}>{moment(data.created_at).calendar()}</div>
      </div>
    </div>
  );
};

export default LogPreview;
