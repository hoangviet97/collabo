import React, { useEffect, FC } from "react";
import { Avatar, Input, Badge } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { Link } from "react-router-dom";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  member: any;
  match: any;
}

const ReviewLink: FC<Props> = ({ member, match }) => {
  return (
    <div className="review__link">
      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <Avatar style={{ backgroundColor: member.color === null || member.color.length < 1 ? color.normal_orange : member.color }}>
          <AvatarIcon firstname={member.firstname} lastname={member.lastname} />
        </Avatar>
        <div style={{ marginLeft: "10px" }}>
          <Link to={`${match.url}/${member.member_id}`}>
            {member.firstname} {member.lastname}
          </Link>
        </div>
      </div>
      <Badge count={member.total} />
    </div>
  );
};

export default ReviewLink;
