import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./helpers/setAuthToken";
import { loadUser, logout } from "./actions/auth";
import { useEffect } from "react";
import ProtectedRoute from "./components/routing/ProtectedRoute";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
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
