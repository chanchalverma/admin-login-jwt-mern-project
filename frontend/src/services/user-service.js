import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

const getUserDashboard = () => {
  console.log("");
  //   return axios.get(API_URL + "user", { headers: authHeader() });
  return axios.get(`${API_URL}dashboard/user`, { headers: authHeader() });
};

const getAdminDashboard = async () => {
  console.log("op=", authHeader());
  const header = await authHeader();
  //   return axios.get(API_URL + "admin", { headers: authHeader() });
  return axios.get(`${API_URL}dashboard/admin`, { headers: header });
};

const deleteDataById = async (id) => {
  console.log("mes=", id);
  const message = axios.delete(`${API_URL}admin/${id}`);

  return message;
};

const updateDataById = async (id, payload) => {
  const { data } = await axios.put(`${API_URL}admin/${id}`, payload);
  return data;
};

export default {
  //   getPublicContent,
  getUserDashboard,
  deleteDataById,
  getAdminDashboard,
  updateDataById,
};
