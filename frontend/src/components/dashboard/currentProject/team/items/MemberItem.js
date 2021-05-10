import React from "react";
import { Checkbox, Avatar, Select } from "antd";
import { connect } from "react-redux";

const MemberItem = (props) => {
  const { Option } = Select;

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <div className="members-item">
      <div className="members-item__identity">
        <div class="members-item__name">
          <Avatar />
          <span>
            {props.member.firstname} {props.member.lastname}
          </span>
        </div>
      </div>
      <div className="members-item__email">{props.member.email}</div>
      <div className="members-item__role">
        <Select showArrow={false} bordered={false} defaultValue={props.member.name} style={{ width: "100%" }}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
      <div className="members-item__tasks">12</div>
      <div className="members-item__status">online</div>
      <div className="members-item__more">...</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role
});

export default connect(mapStateToProps, {})(MemberItem);
