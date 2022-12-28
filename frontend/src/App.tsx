import "./App.scss";
import * as React from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Verification from "./components/auth/Verification";
import Reset from "./components/auth/Reset";
import PasswordReset from "./components/auth/PasswordReset";
import Dashboard from "./components/main/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import setAuthToken from "./helpers/setAuthToken";
import { loadUser } from "./actions/auth";
import { useEffect } from "react";
import ProtectedRoute from "./components/routing/ProtectedRoute";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/verify/:id" component={Verification} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/pwd-reset/:id" component={PasswordReset} />
        <ProtectedRoute path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
