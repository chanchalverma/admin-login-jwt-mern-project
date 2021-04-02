const mongoose = require("mongoose");

const user = new mongoose.Schema({
  // creating schema for todo app

  username: {
    type: String,
    required: "Username is required",
  },
  first_name: {
    type: String,
    required: "First Name is required",
  },
  last_name: {
    type: String,
    required: "Last Name is required",
  },
  hobbies: [
    {
      type: String,
    },
  ],
  password: {
    type: String,
    required: "password is required",
  },
  email: {
    type: String,
    required: "email is required",
  },
  roles: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model("User", user);

module.exports = userModel;
