import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import Services from "../services/auth-service";
import { withRouter } from "react-router-dom";

const Header = (props) => {
  const isCurrentUser = Services.getCurrentUser();
  console.log("is current user=", isCurrentUser);

  const logout = () => {
    localStorage.removeItem("user");
    props.history.push("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark m-2 text-white ">
      <ul className=" navbar-flex">
        {isCurrentUser ? (
          <>
            <li className="navbar-item">
              <button
                onClick={logout}
                className="nav-link"
                style={{
                  background: "linear-gradient(45deg, black, darkslategray)",
                  color: "white",
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link className="nav-link" to="/signup">
                SignUp
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/">
                SignIN
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Header);
