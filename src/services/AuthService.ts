import { API, config } from "../api";
import User from "../shared/models/UserModel";
class AuthService {
  static userLogin(user: User) {
    return API.post(config.api.auth.login, user);
  }
  static validateToken(token?: string) {
    return API.post(config.api.auth.validateToken, { token });
  }
  static sendPasswordResetLink(email?: string) {
    return API.post(config.api.auth.resetPassword, { email });
  }
  static refreshToken() {
    const refreshToken = sessionStorage.getItem("rtoken");
    if (!refreshToken) return Promise.reject("Token not available");
    return API.post(config.api.auth.refreshToken, { refreshToken });
  }
}
export default AuthService;
