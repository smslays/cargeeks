import * as React from "react";
import {
  Container,
  Grid,
  Box,
  TextField as TField,
  Avatar,
  Button,
  Divider,
  Paper,
  Card,
  FormControl,
  InputLabel,
  Select as Slect,
  MenuItem,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
} from "@mui/material";
import User from "../../../shared/models/UserModel";
import { styled } from "@mui/system";
import CountryService from "../../../services/CountryService";
import { string } from "yup";
import UserService from "../../../services/UserService";
import { useSelector } from "react-redux";
import { addLoggedUser, selectLoggedUser } from "../../frontend/auth/AuthSlice";
import { errorToast, successToast } from "../../../ui/toasts/Toast";
import UserForm from "../users/UserForm";
interface IUserProfileProps {}

const UserProfile: React.FunctionComponent<IUserProfileProps> = (props) => {
  const loggedUser = useSelector(selectLoggedUser);
  return <UserForm type="profile" role={loggedUser?.role} />;
};

export default UserProfile;
