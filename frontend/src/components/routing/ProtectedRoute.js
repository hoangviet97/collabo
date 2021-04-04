import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../helpers/history";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  if (isAuthenticated === false) {
    return <Redirect to="/login" />;
  } else {
    return <Component {...rest} />;
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(withRouter(ProtectedRoute));
