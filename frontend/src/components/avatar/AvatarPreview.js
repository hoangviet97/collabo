import React, { useState } from "react";
import { Popover, Avatar } from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import AvatarIcon from "../utils/AvatarIcon";

const AvatarPreview = ({ assignees, showAssigness, max }) => {
  return (
    <div className="avatar__preview">
      {assignees.length > 0 ? (
        <>
          <Avatar.Group size={32} maxCount={max} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {assignees.map((assignee, index) => (
              <Popover content={assignee.firstname}>
                <Avatar key={index} style={{ backgroundColor: "#1890ff" }}>
                  <AvatarIcon name={assignee.firstname} />
                </Avatar>
              </Popover>
            ))}
          </Avatar.Group>
          <div onClick={showAssigness} style={{ position: "absolute", width: "20px", height: "20px", marginTop: "-45px", borderRadius: "50%", marginLeft: assignees.length === 1 ? "28px" : `${14 + 21 * assignees.length}px`, border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "999" }}>
            <EditOutlined style={{ fontSize: "10px", color: "#bdc3c7" }} />
          </div>
        </>
      ) : (
        <div onClick={showAssigness} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <UserAddOutlined style={{ fontSize: "20px", color: "#bdc3c7" }} />
        </div>
      )}
    </div>
  );
};

export default AvatarPreview;
