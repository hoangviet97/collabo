import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../components/utils/Spinner";

const ProtectedRoute = ({ component: Component, isAuthenticated, loading, ...rest }) => {
  if (!localStorage.token || localStorage.token === null) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...rest} render={(props) => (isAuthenticated === false ? <Spinner /> : <Component {...props} />)} />;
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, {})(ProtectedRoute);
