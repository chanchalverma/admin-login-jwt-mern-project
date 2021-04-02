import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, withRouter } from "react-router-dom";
import AuthService from "../services/auth-service";

const Home = (props) => {
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      if (user.roles == "admin") {
        return props.history.push("/dashboard/admin");
      } else if (user.roles == "user") {
        return props.history.push("/dashboard/user");
      }
    } else {
      return props.history.push("/signin");
    }
  }, []);

  return (
    <>
      <div>Loading...</div>
    </>
  );
};

export default withRouter(Home);
