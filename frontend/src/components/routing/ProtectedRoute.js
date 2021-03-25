import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...children }) => {
  if (isAuthenticated === true) {
    return <Route {...children} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="login" />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(ProtectedRoute);
