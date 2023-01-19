import { Card } from "@mui/material";
import { Container } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";
import ChangePasswordForm from "../../../ui/change-password/ChangePasswordForm";
import { errorToast, successToast } from "../../../ui/toasts/Toast";
import {
  addLoggedUser,
  resetLoggedUser,
  selectLoggedUser,
} from "../../frontend/auth/AuthSlice";

interface IChangeUserPasswordProps {}

const ChangeUserPassword: React.FunctionComponent<IChangeUserPasswordProps> = (
  props
) => {
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePassword = (password: string) => {
    const fd = new FormData();
    fd.append("password", password);
    UserService.updateUser(loggedUser?.id, fd)
      .then((response) => {
        successToast("Password updated...");
        sessionStorage.clear();
        dispatch(resetLoggedUser);
        navigate("/login");
      })
      .catch((err) => {
        errorToast("Could not update password...");
        console.log(err);
      });
  };
  return (
    <Container maxWidth="sm">
      <Card variant="elevation" sx={{ p: 2 }}>
        <ChangePasswordForm handleChangePassword={handlePassword} />
      </Card>
    </Container>
  );
};

export default ChangeUserPassword;
