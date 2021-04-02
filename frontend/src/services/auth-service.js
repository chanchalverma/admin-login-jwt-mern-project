import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = (
  username,
  email,
  password,
  first_name,
  last_name,
  hobbies
) => {
  return axios.post(`${API_URL}signup`, {
    username,
    email,
    password,
    first_name,
    last_name,
    hobbies,
  });
};

const login = (username, password) => {
  return axios
    .post(`${API_URL}signin`, {
      username,
      password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,

  getCurrentUser,
};
