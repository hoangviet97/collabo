import React, { useState, FC } from "react";
import AvatarIcon from "../utils/AvatarIcon";
import moment from "moment";
import { Avatar, Button, Divider } from "antd";
import Poll from "../poll/Poll";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  data: any;
  match: any;
  project: any;
}

const Comment: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className="comment" style={{ width: "70%", padding: "25px 40px", borderRadius: "12px", marginBottom: "40px", backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
      <div className="comment__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div className="comment__author" style={{ display: "flex", alignItems: "center" }}>
          <Avatar size={50} style={{ marginRight: "10px" }}>
            <AvatarIcon firstname={data.firstname} lastname={data.lastname} />
          </Avatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#636e72", fontSize: "16px" }}>{`${data.firstname} ${data.lastname}`}</span>
            <span style={{ color: "#b2bec3", fontSize: "12px" }}>{moment(data.created_at).format("MMMM Do YY, hh:mm a")}</span>
          </div>
        </div>
      </div>
      <div className="comment__body" style={{ marginBottom: "15px" }}>
        <div className="comment__text">
          <p>{data.text}</p>
        </div>
        <Divider />
        {data.pollData.question && <Poll pollData={data.pollData} id={data.id} />}
      </div>
    </div>
  );
};

export default Comment;
