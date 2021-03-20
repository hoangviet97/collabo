import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./helpers/setAuthToken";
import { loadUser } from "./actions/auth";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Route path="/" component={Dashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </>
      </Router>
    </Provider>
  );
};

export default App;
