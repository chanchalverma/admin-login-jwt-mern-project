import React, { useState, useEffect } from "react";
import UserService from "../services/user-service";
import playerList from "../PlayersList/playersList";
import AuthService from "../services/auth-service";

import PaginationTable from "./PaginationTable";

// table headers
const Header = ["First Name", "Last Name", "Player ID", "Team Id"];
const perPageItemCount = 50;
const columns = "firstName.lastName.playerId.teamId";
const title = "Player List";

const UserDashboard = (props) => {
  const [content, setContent] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (!user) {
      props.history.push("/");
    }
    UserService.getUserDashboard().then(
      (response) => {
        setContent(playerList);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrorMessage(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <PaginationTable
          header={Header}
          data={content}
          perPageItemCount={perPageItemCount}
          columns={columns}
          title={title}
        />

        <h3>{errorMessage && errorMessage}</h3>
      </header>
    </div>
  );
};
export default UserDashboard;
