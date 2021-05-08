import React from "react";
import { Checkbox, Avatar } from "antd";
import { connect } from "react-redux";

const MemberItem = (props) => {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <div className="members-item">
      <div className="members-item__identity">
        <div class="members-item__name">
          <Avatar />
          <span>{props.member.firstname}</span>
        </div>
      </div>
      <div className="members-item__role">{props.member.name}</div>
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
