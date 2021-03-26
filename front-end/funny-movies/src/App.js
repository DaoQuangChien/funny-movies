import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import { HeaderBar } from "./components";
import { Home, PostVideo } from "./containers";
import request from "./services/request";
import { getUserData, useAuthenActions } from "./shared";

const PrivateRoute = ({ children, ...rest }) => {
  const userData = getUserData();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  const [, setIsSignIn] = useAuthenActions();
  const onAuthenticate = (path) => (email, password) => {
    return request
      .post(path, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        setIsSignIn(true);
      });
  };
  const onSignIn = onAuthenticate("/auth/signin");
  const onSignUp = onAuthenticate("/auth/signup");
  const onSignOut = () => {
    setIsSignIn(false);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="app-container">
        <HeaderBar
          onSignIn={onSignIn}
          onSignUp={onSignUp}
          onSignOut={onSignOut}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/post-video">
            <PostVideo />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
