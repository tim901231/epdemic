import axios from "axios";
import dotenv from "dotenv-defaults";

dotenv.config();

// const API_ROOT = `https://epedemic.herokuapp.com:${process.env.PORT}/api`;
const API_ROOT = new URL("/api", window.location.href);

const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
});

export default instance;
