import React, { useEffect, useState } from "react";
import MembersHeader from "./header/MembersHeader";
import { getMembers } from "../../../../actions/member";
import MemberItem from "./items/MemberItem";
import { connect } from "react-redux";
import { Input } from "antd";

const Members = ({ members, getMembers }) => {
  useEffect(() => {
    getMembers({ id: 47823657 });
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
        .filter((item) => item.firstname.toLowerCase().includes(searchValue) || item.email.toLowerCase().includes(searchValue))
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
