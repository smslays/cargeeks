import axios from "axios";
import config from "./config";
const instance = axios.create({
  baseURL: config.countryServerURL,
});

instance.interceptors.request.use((req) => {
  req.headers && (req.headers["X-CSCAPI-KEY"] = config.countryAPIKey);

  return req;
});

export default instance;
