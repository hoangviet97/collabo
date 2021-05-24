import React, { Children } from "react";
import { connect } from "react-redux";

const PermissionGate = ({ children, role, userRole }) => {
  const couldShow = userRole.includes(role);
  return couldShow ? children : null;
};

const mapStateToProps = (state) => ({
  userRole: state.project.currentProject.role
});

export default connect(mapStateToProps, {})(PermissionGate);
