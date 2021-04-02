import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, withRouter } from "react-router-dom";
import AuthService from "../services/auth-service";

const Home = (props) => {
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    console.log("in");
    if (user) {
      console.log("uer =", user);
      setCurrentUser(user);
      setShowUserDashboard(user.roles.includes("user"));
      setShowAdminDashboard(user.roles.includes("admin"));

      console.log("user==", user);
      if (showAdminDashboard == "admin") {
        return props.history.push("/dashboard/admin");
      } else if (showUserDashboard == "user") {
        return props.history.push("/dashboard/user");
      }
    } else {
      console.log("redirect to signup");
      return props.history.push("/signin");
    }
  });
  return (
    <>
      <div>Loading...</div>
    </>
  );
};

export default withRouter(Home);
