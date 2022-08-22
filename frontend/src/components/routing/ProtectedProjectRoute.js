import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import FullPageSkeleton from "../skeletons/FullpageSkeleton";

const ProtectedProjectRoute = ({ component: Component, authorized, ...rest }) => {
  return <Route {...rest} render={(props) => (authorized === false ? <FullPageSkeleton /> : <Component {...props} />)} />;
};

const mapStateToProps = (state) => ({
  authorized: state.project.authorized
});

export default connect(mapStateToProps, {})(ProtectedProjectRoute);
