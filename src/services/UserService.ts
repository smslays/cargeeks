import API from "../api/API";

import { AxiosResponse } from "axios";
import User from "../shared/models/UserModel";
import config from "../api/config";
class UserService {
  static createUser(user: FormData): Promise<AxiosResponse> {
    return API.post(config.api.users.create, user);
  } //createUser

  static updateUser(id: string, user: FormData): Promise<AxiosResponse> {
    return API.put(config.api.users.update + id, user);
  } //updateUser

  static deleteUser(id: string): Promise<AxiosResponse> {
    return API.delete(config.api.users.delete + id);
  } //deleteUser

  static fetchOneUser(id: string): Promise<AxiosResponse> {
    return API.get(config.api.users.getOne + id);
  } //fetchOneUser

  static fetchAllUser(query: string): Promise<AxiosResponse> {
    return API.get(config.api.users.getAll + query);
  } //fetchAllUser
}
export default UserService;
