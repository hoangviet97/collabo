import React, { useEffect, FC } from "react";
import { Avatar, Input, Badge } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { Link } from "react-router-dom";

interface Props {
  member: any;
  match: any;
}

const ReviewLink: FC<Props> = ({ member, match }) => {
  return (
    <div className="review__link" style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <Avatar>
          <AvatarIcon name={member.firstname} />
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
