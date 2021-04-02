import React, { useState, useEffect } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./components/SignIn";

import SignUp from "./components/SignUp";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import AuthService from "./services/auth-service";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard/admin" component={AdminDashboard} />
          <Route exact path="/dashboard/user" component={UserDashboard} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
