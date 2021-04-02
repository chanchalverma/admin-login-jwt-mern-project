import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

const getUserDashboard = async () => {
  return await axios.get(`${API_URL}dashboard/user`, { headers: authHeader() });
};

const getAdminDashboard = async () => {
  const header = await authHeader();
  return axios.get(`${API_URL}dashboard/admin`, { headers: header });
};

const deleteDataById = async (id) => {
  const message = axios.delete(`${API_URL}admin/${id}`);

  return message;
};

const updateDataById = async (id, payload) => {
  const { data } = await axios.put(`${API_URL}admin/${id}`, payload);
  return data;
};

export default {
  getUserDashboard,
  deleteDataById,
  getAdminDashboard,
  updateDataById,
};
