import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/AuthService";

interface IEmailSentMessage {
  email: string;
}

const EmailSentMessage: React.FunctionComponent<IEmailSentMessage> = ({
  email,
}) => {
  return (
    <>
      <p>Password reset link has been sent to your email address {email}.</p>
      <Link to="/login">Go to Login</Link>
    </>
  );
};

interface IForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = (
  props
) => {
  const [email, setEmail] = React.useState<string>("");
  const [hasEmailSent, sethasEmailSent] = React.useState<boolean>(false);

  const handleLinkSend = () => {
    AuthService.sendPasswordResetLink(email)
      .then((response) => {
        console.log("Email sent");
        sethasEmailSent(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card variant="elevation" sx={{ p: 2 }}>
          {hasEmailSent ? (
            <EmailSentMessage email={email} />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  <b>
                    Enter your Registered email address to reset password link
                  </b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleLinkSend}
                  disabled={!email}
                >
                  Send Link
                </Button>
              </Grid>
            </Grid>
          )}
        </Card>
      </Container>
    </>
  );
};

export default ForgotPassword;
