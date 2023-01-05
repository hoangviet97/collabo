import React from "react";
import { Avatar, Badge } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AvatarIcon from "../utils/AvatarIcon";
import { Link } from "react-router-dom";
import color from "../../styles/abstract/variables.module.scss";

interface Props extends RouteComponentProps {
  member: any;
}

const ReviewLink = ({ member, match }: Props) => {
  return (
    <div className="review__link">
      <div className="review__link-wrapper">
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

export default withRouter(ReviewLink);
