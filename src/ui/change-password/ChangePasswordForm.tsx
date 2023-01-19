import * as React from "react";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";

interface IChangePasswordFormProps {
  handleChangePassword: (password:string) => void;
}

const ChangePasswordForm: React.FunctionComponent<IChangePasswordFormProps> = ({
  handleChangePassword,
}) => {
  const [password, setPassword] = React.useState({
    newPass: "",
    confirmPass: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h3">
            <b>Change Password</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="New Password"
            name="newPass"
            type="password"
            value={password?.newPass}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            name="confirmPass"
            type="password"
            value={password?.confirmPass}
            onChange={handleChange}
            error={password?.newPass !== password?.confirmPass}
            helperText={
              password?.newPass !== password?.confirmPass
                ? "Passwords did not match"
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={()=>handleChangePassword(password?.newPass)}
            disabled={
              !password.newPass || password?.newPass !== password?.confirmPass
            }
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChangePasswordForm;
