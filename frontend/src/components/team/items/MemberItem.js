import React from "react";
import { Checkbox, Avatar, Select } from "antd";
import { connect } from "react-redux";
import StatusMark from "../../utils/StatusMark";
import AvatarIcon from "../../utils/AvatarIcon";
import Moment from "react-moment";
import { updateMemberRole } from "../../../actions/member";

const MemberItem = (props) => {
  const { Option } = Select;

  function roleHandle(value) {
    props.updateMemberRole({ id: props.member.id, project: props.projectId, role_id: value });
  }

  return (
    <div className="members-item">
      <div className="members-item__identity">
        <div className="members-item__name">
          <Avatar size="large">
            <AvatarIcon name={props.member.firstname} />
          </Avatar>
          <span>
            {props.member.firstname} {props.member.lastname}
          </span>
        </div>
      </div>
      <div className="members-item__email">{props.member.email}</div>
      <div className="members-item__role">
        <Select showArrow={false} bordered={false} defaultValue={props.member.role_id} onChange={roleHandle} style={{ width: "100%" }}>
          <Option value="0">Owner</Option>
          <Option value="1">Admin</Option>
          <Option value="2">Member</Option>
        </Select>
      </div>
      <div className="members-item__tasks">
        <Moment format="D MMM YYYY">{props.member.created_at}</Moment>
      </div>
      <div className="members-item__status" style={{ display: "flex", justifyContent: "center" }}>
        <StatusMark color="#6ab04c" />
      </div>
      <div className="members-item__more">...</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role
});

export default connect(mapStateToProps, { updateMemberRole })(MemberItem);
