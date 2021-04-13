import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const MemberItem = ({ member }) => {
  return (
    <div className="member-list-item">
      <div class="member-item-identity">
        <Avatar size={45} icon={<UserOutlined />} />
        <span className="member-item-name">
          {member.firstname} {member.lastname}
        </span>
      </div>
    </div>
  );
};

export default MemberItem;
