import "./App.scss";
import * as React from "react";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/auth/VerificationPage";
import ResetPage from "./pages/auth/ResetPage";
import PasswordResetPage from "./pages/auth/PasswordResetPage";
import Dashboard from "./layout/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import setAuthToken from "./helpers/setAuthToken";
import { loadUser } from "./redux/actions/auth";
import { useEffect } from "react";
import ProtectedRoute from "./routing/ProtectedRoute";

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
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/verify/:id" component={VerificationPage} />
        <Route exact path="/reset" component={ResetPage} />
        <Route exact path="/pwd-reset/:id" component={PasswordResetPage} />
        <ProtectedRoute path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
