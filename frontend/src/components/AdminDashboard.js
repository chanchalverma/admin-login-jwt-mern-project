import React from "react";

import { Link } from "react-router-dom";
import Modal from "./Modal";
import UserService from "../services/user-service";
import PaginationTable from "./PaginationTable";
import AuthService from "../services/auth-service";

// table headers
const Header = [
  "First Name",
  "Last Name",
  "Email",
  "Username",
  "Hobbies",
  "Delete",
  "Edit",
];

class Dashboard extends React.Component {
  state = {
    userData: [],
    open: false,
    content: [],
    errMessage: "",
    profileData: this.props.location.state,
  };

  onModalOpen = () => {
    this.setState({ open: true });
  };

  onModalClose = () => {
    this.setState({ open: false });
  };

  handleDelete = (id) => {
    let data = [...this.state.content];

    UserService.deleteDataById(id)
      .then((res) => {
        const afterRemoveData = data.filter((data) => data._id !== id);
        this.setState({ content: afterRemoveData });
        console.log("pp=", afterRemoveData, this.state.content);
      })
      .catch((err) => {
        console.log("err=", err);
        this.setState({ content: "Try Agian something went wrong" });
      });
  };

  handleEdit = (dataforEdit) => {
    let data = [...this.state.content];
    console.log(":oo=", dataforEdit, data);
    const {
      id,
      first_name,
      last_name,
      email,
      username,
      hobbies,
      roles,
    } = dataforEdit;

    this.setState({
      open: true,

      selectedId: id,
      selectedFirstName: first_name,
      selectedLastName: last_name,
      selectedHobbies: hobbies,
      selectedEmail: email,
      selectedUsername: username,
      selectedRoles: roles,
    });
  };

  onModalHandler = (id, name, email, contact) => {
    console.log(name, email);
  };

  onChangeHandler = (event) => {
    let textbox = event.target.value;
    console.log(textbox);

    this.setState({
      [event.target.name]: textbox,
    });
  };

  onUpdateData = async () => {
    let newFirstName = this.state.selectedFirstName;
    let newLastName = this.state.selectedLastName;
    let newEmail = this.state.selectedEmail;
    let newHobbies = this.state.selectedHobbies;
    let newUsername = this.state.selectedUsername;
    let newRoles = this.state.selectedRoles;
    let id = this.state.selectedId;

    if (id) {
      let deleteButton = (
        <button
          className="btn btn-primary "
          onClick={() => this.handleDelete(id)}
        >
          Delete
        </button>
      );
      let editButton = (
        <button
          className="btn btn-primary "
          onClick={() => this.handleDelete()}
        >
          Delete
        </button>
      );
      const newData = {
        _id: id,
        email: newEmail,
        first_name: newFirstName,
        last_name: newLastName,
        hobbies: newHobbies,
        username: newUsername,
        roles: newRoles,
        deleteButton: deleteButton,
        editButton: editButton,
      };

      let oldData = [...this.state.content];
      UserService.updateDataById(id, newData)
        .then((res) => {
          console.log("updtae=", res);
          const idOfUpdateData = res.id;
          const removeoldData = oldData.filter((data) => data._id !== id);
          console.log("filter==", removeoldData);
          this.setState({
            content: [newData, ...removeoldData],
            open: false,
          });
        })
        .catch();
    }
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) {
      this.props.history.push("/");
    }

    UserService.getAdminDashboard().then(
      (response) => {
        console.log("res=", response.data);
        const newListWithButtons =
          response.data &&
          response.data.forEach((data) => {
            const id = data._id;
            const editProfile = {
              id: data._id,
              first_name: data.first_name,
              last_name: data.last_name,
              hobbies: data.hobbies,
              email: data.email,
              roles: data.roles,
              username: data.username,
            };
            console.log("id=", id);
            return (
              (data.deleteButton = (
                <button
                  className="btn btn-primary "
                  onClick={() => this.handleDelete(id)}
                >
                  Delete
                </button>
              )),
              (data.editButton = (
                <button
                  className="btn btn-primary "
                  onClick={() => this.handleEdit(editProfile)}
                >
                  Edit
                </button>
              ))
            );
          });
        console.log("data=", response.data);
        this.setState({ content: response.data });
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({ content: "Not Authorized person" });
      }
    );
  }

  render() {
    const perPageItemCount = 10;
    const columns =
      "first_name.last_name.email.username.hobbies.deleteButton.editButton";
    const title = "Players List";

    return (
      <>
        <div className="container">
          <button
            onClick={() => this.onModalHandler()}
            className="btn btn-block text-white text-right"
          >
            Profile
          </button>
          <h1>Users List</h1>
          <div className="">
            <PaginationTable
              header={Header}
              data={this.state.content}
              perPageItemCount={perPageItemCount}
              columns={columns}
              title={title}
            />
          </div>
          <Modal
            open={this.state.open}
            onClose={this.onModalClose}
            id={this.state.selectedId}
            firstName={this.state.selectedFirstName}
            lastName={this.state.selectedLastName}
            username={this.state.selectedUsername}
            roles={this.state.selectedRoles}
            email={this.state.selectedEmail}
            hobbies={this.state.selectedHobbies}
            onUpdate={this.onChangeHandler}
            onUpdateData={this.onUpdateData}
          />
        </div>
      </>
    );
  }
}

export default Dashboard;
