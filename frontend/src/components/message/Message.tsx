import React, { FC } from "react";
import AvatarIcon from "../utils/AvatarIcon";
import moment from "moment";
import { Avatar, Divider } from "antd";
import Poll from "../poll/Poll";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  data: any;
  match: any;
  project: any;
}

const Message: FC<Props> = ({ data }) => {
  return (
    <div className="comment">
      <div className="comment__header">
        <div className="comment__author">
          <Avatar size={50} style={{ marginRight: "10px", backgroundColor: data.color === null || data.color.length < 1 ? color.normal_orange : data.color }}>
            <AvatarIcon firstname={data.firstname} lastname={data.lastname} />
          </Avatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#636e72", fontSize: "16px" }}>{`${data.firstname} ${data.lastname}`}</span>
            <span style={{ color: "#b2bec3", fontSize: "12px" }}>{moment(data.created_at).format("MMMM Do YY, hh:mm a")}</span>
          </div>
        </div>
      </div>
      <div className="comment__body">
        <div className="comment__text">
          <p>{data.text}</p>
        </div>
        <Divider />
        {data.pollData.question && <Poll pollData={data.pollData} id={data.id} />}
      </div>
    </div>
  );
};

export default Message;
