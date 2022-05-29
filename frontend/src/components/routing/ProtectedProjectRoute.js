import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../utils/Spinner";

const ProtectedProjectRoute = ({ component: Component, authorized, ...rest }) => {
  return <Route {...rest} render={(props) => (authorized === false ? <Spinner /> : <Component {...props} />)} />;
};

const mapStateToProps = (state) => ({
  authorized: state.project.authorized
});

export default connect(mapStateToProps, {})(ProtectedProjectRoute);
