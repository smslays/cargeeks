import React, { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, NavLink as NLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import Verified from "@mui/icons-material/VerifiedRounded";
// import firebase from "firebase";
import { auth } from "../../../shared/firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import UserService from "../../../services/UserService";
import User from "../../../shared/models/UserModel";
import { Toast, successToast, errorToast } from "../../../ui/toasts/Toast";
declare global {
  interface Window {
    appVerifier: any;
    confirmationResult: any;
  }
}

const UserValidationSchema = yup.object().shape({
  name: yup.object({
    first: yup.string().required("First Name is required"),
    last: yup.string().required("Last Name is required"),
  }),
  mobile: yup
    .string()
    .required()
    .matches(/^[0-9]{10}$/, "Mobile Must be 10 Digit"),
  email: yup
    .string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/, "Enter valid Email Address"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must have min 8 characters and 1 cap & small letter, Symbol"
    ),
});

const initialUser: User = {
  name: { first: "", last: "" },
  mobile: "",
  email: "",
  password: "",
  role: "customer",
};

const NavLink = styled(NLink)({
  textDecoration: "none",
});

const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();

  const [OTPStatus, setOTPStatus] = useState({
    OTP: "",
    showOTP: false,
    sendOTP: false,
  });
  const [mobNumber, setMobNumber] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(NaN);
  const [activeElementId, setActiveElementId] = useState("");
  const [signUpCheckbox, setSignUpCheckbox] = useState<boolean>(false);

  const initialStateReset = () => {
    setVerifiedStatus(true);
    setOTPStatus({ ...OTPStatus, showOTP: false });
    setTimer(0);
    setTimerId(NaN);
    clearInterval(timerId);
  };

  const handleOTPCode = (e: any) => {
    const { value } = e.target;
    if (value.length == 6) setOTPStatus({ ...OTPStatus, OTP: value });
  };

  const sendOTP = () => {
    window.appVerifier = new RecaptchaVerifier(
      "sign-in-button",
      //   "recaptcha-container",
      {
        size: "invisible",
        // size: "normal",
        callback: (response: any) => {
          // console.log("Can call verify-Method");
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );

    signInWithPhoneNumber(auth, `+91${mobNumber}`, window.appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        // console.log(`OTP has sent to mobile number => ${mobNumber}`);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.error(error);
        setVerifiedStatus(false);
        return;
        // ...
      });
  };

  const verifyOTP = (val: any) => {
    if (mobNumber == "") alert("Please check Mobile Number..");
    if (OTPStatus?.OTP?.length != 6) alert("OTP must have 6 digit..");

    window.confirmationResult
      .confirm(OTPStatus.OTP)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        initialStateReset();
        // ...
      })
      .catch((error: any) => {
        alert("Wrong Password..");
        console.error("Wrong password", error);

        // User couldn't sign in (bad verification code?)
        // ...
      });

    // console.log(val);
  };

  const CDTimer = () => {
    setTimerId(
      Number(
        setInterval(() => {
          setTimer((timer) => timer - 1);
        }, 1000)
      )
    );
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setTimer(0);
  };

  useEffect(() => {
    // setTimer(timer);
    // setVerifiedStatus(verifiedStatus);
    if (timer == 60) CDTimer();
    else if (timer == 0) {
      clearInterval(timerId);
      setOTPStatus({ ...OTPStatus, sendOTP: false, showOTP: false });
    }
  }, [timer, OTPStatus.sendOTP, verifiedStatus]);

  // console.log("time: ", timer);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <button id="sign-in-button" style={{ display: "none" }}>
          captcha
        </button>
        <Card variant="elevation" sx={{ p: 3, pt: 0 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ mb: 5 }} component="h1" variant="h5">
              Sign up
            </Typography>

            <Formik
              initialValues={initialUser}
              enableReinitialize
              validationSchema={UserValidationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log("Submitting... ", values);
                const fd = new FormData();
                fd.append("status", "active");
                if (values?.name?.first)
                  fd.append("name.first", values?.name?.first as string);
                if (values?.name?.last)
                  fd.append("name.last", values?.name?.last as string);
                if (values?.mobile)
                  fd.append("mobile", values?.mobile as string);
                if (values?.email) fd.append("email", values?.email as string);
                if (values?.role) fd.append("role", "customer");
                if (values?.password)
                  fd.append("password", values?.password as string);
                UserService.createUser(fd)
                  .then((response) => {
                    const message = response?.data?.message || "Registered..";
                    // successToast(message);
                    navigate("/login");
                  })
                  .catch((err) => {
                    console.error(err);
                    const message =
                      err?.response?.data?.message || "Could not registered..";
                    errorToast(message);
                  });
                setVerifiedStatus(false);

                // resetForm({ values: initialUser });
              }}
            >
              {({
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => {
                // console.log(verifiedStatus);
                const touchedValue: any = touched.name;
                const errorsValue: any = errors.name;
                return (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="name.first"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          value={values?.name?.first}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touchedValue?.first &&
                            errors?.name &&
                            errorsValue?.first
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.first && errorsValue?.first
                              ? errorsValue?.first
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="name.last"
                          autoComplete="family-name"
                          value={values?.name?.last}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touched?.name && errorsValue?.last ? true : false
                          }
                          helperText={
                            touched?.name && errorsValue?.last
                              ? errorsValue?.last
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="mobile"
                          label="Mobile"
                          name="mobile"
                          autoComplete="mobile"
                          value={values?.mobile}
                          disabled={verifiedStatus}
                          // placeholder={String("hi")}
                          InputLabelProps={{
                            shrink:
                              activeElementId == "mobile"
                                ? true
                                : values?.mobile?.length != 0
                                ? true
                                : false,
                          }}
                          InputProps={{
                            // label: "Mobile",
                            startAdornment: (
                              <InputAdornment
                                position="end"
                                sx={{ order: 2, mr: "0.5em" }}
                              >
                                {verifiedStatus ? (
                                  <Verified color="primary" />
                                ) : values.mobile?.length == 10 &&
                                  !OTPStatus.sendOTP &&
                                  !errors.mobile &&
                                  !verifiedStatus ? (
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setOTPStatus({
                                        ...OTPStatus,
                                        showOTP: true,
                                        sendOTP: true,
                                      });
                                      sendOTP();
                                      setTimer(60);
                                    }}
                                  >
                                    Send OTP
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </InputAdornment>
                            ),
                          }}
                          onBlur={(e) => {
                            handleBlur(e);
                            setActiveElementId("");
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            setMobNumber(e.target.value);
                            stopTimer();
                          }}
                          onFocus={() => setActiveElementId("mobile")}
                          error={
                            touched?.mobile && errors?.mobile ? true : false
                          }
                          helperText={
                            touched?.mobile && errors?.mobile
                              ? errors?.mobile
                              : ""
                          }
                        />
                        {timer > 0 && (
                          <span style={{ fontSize: "0.8em" }}>
                            {`Resend OTP in ${timer} seconds..`}
                          </span>
                        )}
                      </Grid>
                      {values?.mobile?.length == 10 && OTPStatus.showOTP && (
                        <Grid
                          sx={{
                            flexWrap: "nowrap",
                            justifyContent: "center",
                            m: "1em",
                            // mt: "1em",
                          }}
                        >
                          <TextField
                            type="text"
                            id="otpInput"
                            placeholder="Enter Your Code here"
                            sx={{ width: "50%", fontSize: "0.5em" }}
                            inputProps={{
                              style: {
                                padding: "0.4em",
                              },
                            }}
                            onChange={handleOTPCode}
                            size="small"
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="otpverifybtn"
                            type="button"
                            disabled={OTPStatus.OTP.length == 6 ? false : true}
                            sx={{
                              display: "inline-block",
                              ml: "0.5em",
                              lineHeight: "0.8em",
                              verticalAlign: "-webkit-baseline-middle",
                            }}
                            onClick={() => verifyOTP(OTPStatus.OTP)}
                          >
                            Verify Number
                          </Button>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={values?.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={touched?.email && errors?.email ? true : false}
                          helperText={
                            touched?.email && errors?.email ? errors?.email : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          value={values?.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touched?.password && errors?.password ? true : false
                          }
                          helperText={
                            touched?.password && errors?.password
                              ? errors?.password
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              id="signUpCheckbox"
                              value={signUpCheckbox}
                              onBlur={handleBlur}
                              onChange={(e) =>
                                setSignUpCheckbox(e.target.checked)
                              }
                            />
                          }
                          label="We don't share your personal details (like mobile, email) with anyone :-) "
                          // label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={verifiedStatus ? false : true}
                    >
                      Sign Up
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login">Already have an account? Sign in</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
