import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import UserService from "../../../services/UserService";
import ChangePasswordForm from "../../../ui/change-password/ChangePasswordForm";
import { errorToast, successToast } from "../../../ui/toasts/Toast";

interface IChangePasswordProps {}

const ChangePassword: React.FunctionComponent<IChangePasswordProps> = (
  props
) => {
  const { token } = useParams();
  const [link, setLink] = React.useState(false);
  const [id, setId] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
    } else {
      AuthService.validateToken(token)
        .then((response) => {
          setLink(true);
          setId(response?.data?.data?.id);
        })
        .catch((err) => {
          console.error(err);
          setLink(false);
        });
    }
  }, [token]);

  const handleChangePassword = (password: string) => {
    const fd = new FormData();
    fd.append("password", password);
    UserService.updateUser(id, fd)
      .then((response) => {
        // password updated
        const message = response?.data?.message || "Password Updated..";
        successToast(message);

        navigate("/login");
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message || "Password Not Updated..try again";
        errorToast(message);
        console.log(err);
      });
  };
  return (
    <>
      <Container maxWidth="sm">
        <Card variant="elevation" sx={{ p: 2 }}>
          {link ? (
            <ChangePasswordForm handleChangePassword={handleChangePassword} />
          ) : (
            <>
              <h3>The password reset link has been expired</h3>
              <Link to="/login">Go to login</Link>
              <br />
              <Link to="/forgot-password">Resend password reset link</Link>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default ChangePassword;
