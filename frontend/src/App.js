import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./helpers/setAuthToken";
import { loadUser } from "./actions/auth";
import { useEffect } from "react";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import history from "./helpers/history";

const App = () => {
  useEffect(() => {
    console.log("rendered!");
    if (localStorage.getItem("token") !== null) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
