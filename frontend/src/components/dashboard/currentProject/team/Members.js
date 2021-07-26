import React, { useEffect, useState } from "react";
import MembersHeader from "./header/MembersHeader";
import { getMembers } from "../../../../actions/member";
import MemberItem from "./items/MemberItem";
import { connect } from "react-redux";
import { Input } from "antd";

const Members = ({ members, getMembers, projectId }) => {
  useEffect(() => {
    getMembers({ id: projectId });
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="members" style={{ marginTop: "20px" }}>
      <Input onChange={searchHandler} style={{ width: "30%" }} placeholder="Search member name" />
      <MembersHeader />
      {members
        .filter((item) => item.firstname.toLowerCase().includes(searchValue.toLowerCase()) || item.lastname.toLowerCase().includes(searchValue.toLowerCase()) || item.email.toLowerCase().includes(searchValue.toLowerCase()))
        .map((member, index) => (
          <MemberItem member={member} key={index} />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.member.members
});

export default connect(mapStateToProps, { getMembers })(Members);
