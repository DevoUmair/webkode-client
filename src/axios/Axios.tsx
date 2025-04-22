import axios from "axios";
const server = "https://webkode-server.vercel.app";

const finteckApi = axios.create({
  baseURL: `${server}/api`,
  withCredentials: true,
});

export default finteckApi;
