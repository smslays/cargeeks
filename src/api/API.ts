import axios from "axios";
import { resetAuthState } from "../app/store";
import AuthService from "../services/AuthService";
import config from "./config";
const API = axios.create({
  baseURL: `${config.serverBaseURL}/api/v1`,
});

//req interceptor to add token to each header of every req
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("atoken");
  if (token) req.headers && (req.headers["authorization"] = token);
  return req;
});

//resp interceptor to check token validity
API.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err?.response?.status == 406) {
      console.log("Interceptor err: ", err);

      const response = await AuthService.refreshToken();
      if (response?.status == 200) {
        const { accessToken, refreshToken } = response?.data?.data;
        sessionStorage.setItem("atoken", accessToken);
        sessionStorage.setItem("rtoken", refreshToken);
        return Promise.resolve(response);
      } else {
        return Promise.reject("Try again");
      }
    } else if (err?.response?.status == 403) {
      console.log("Destroy the session");
      sessionStorage.clear();
      resetAuthState();
      // window.location.href = "/login";
      return Promise.reject(err);
    } else return err;
  }
);

export default API;
