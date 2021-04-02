import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Modal(props) {
  console.log("props in modal=", props);
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Modify your Data</DialogTitle>
      <DialogContent>
        <DialogContentText>Profile- {props.email}</DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="firstname"
          label="First Name"
          type="text"
          name="selectedFirstName" // this name goes to onChangeHandler.event.target.name= selectName
          value={props.firstName} // same as above and event.target.value
          onChange={(e) => props.onUpdate(e)}
          fullWidth
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastname"
          label="Last Name"
          type="text"
          name="selectedLastName" // this name goes to onChangeHandler.event.target.name= selectLastName
          value={props.lastName} // same as above and event.target.value
          onChange={(e) => props.onUpdate(e)}
          fullWidth
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          name="selectedUsername" // this name goes to onChangeHandler.event.target.name= selectName
          value={props.username} // same as above and event.target.value
          onChange={(e) => props.onUpdate(e)}
          fullWidth
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="roles"
          label="Role"
          type="text"
          name="selectedRoles" // this name goes to onChangeHandler.event.target.name= selectName
          value={props.roles} // same as above and event.target.value
          onChange={(e) => props.onUpdate(e)}
          fullWidth
          required
        />
        <TextField
          margin="dense"
          id="Email"
          label="Email Address"
          type="email"
          name="selectedEmail"
          onChange={props.onUpdate}
          value={props.email}
          fullWidth
          required
        />
        <TextField
          margin="dense"
          id="hobbies"
          label="Hobbies"
          type="text"
          name="selectedHobbies"
          onChange={props.onUpdate}
          value={props.hobbies}
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={props.onUpdateData}
          color="primary"
          //   disabled={(props.name && props.email) == null ? true : false}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
