import React, { useEffect } from "react";
import Container from "../../utils/Container";
import { connect } from "react-redux";
import { getMembers } from "../../../actions/member";
import MemberList from "../memberList/MemberList";

const ProjectMembers = (props) => {
  useEffect(() => {
    props.getMembers(props.match.params.id);
    console.log(props.match.params.id);
  }, []);

  return (
    <div className="project-members">
      <Container size="30">
        <MemberList members={props.members} />
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.member.memberList
});

export default connect(mapStateToProps, { getMembers })(ProjectMembers);
