import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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

export default connect(mapStateToProps, {})(ProtectedRoute);
