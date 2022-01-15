import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import instance from "../instance";
import validator from "email-validator";
import { useRef, useState } from "react";
import bcrypt from "bcryptjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp(props) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongUserId, setWrongUserId] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongRePassword, setWrongRePassword] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("Invalid email");
  const [errorMessageUserId, setErrorMessageUserId] =
    useState("ID already used");
  const [errorMessagePassword, setErrorMessagePassword] = useState(
    "Password not strong enough"
  );
  const errorMessageRePassword = "Not same with password";
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  let idRef = useRef(null);
  let emailRef = useRef(null);
  let pwRef = useRef(null);
  let repwRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const form = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const email = form.get("email");
    const userId = form.get("userId");
    let password = form.get("password");
    const repassword = form.get("repassword");

    if (!validator.validate(email)) {
      emailRef.current.value = "";
      setWrongEmail(true);
      setErrorMessageEmail("Invalid email");
      emailRef.current.focus();
      setSubmit(false);
      return;
    }
    if (!userId) {
      setErrorMessageUserId("User ID is empty");
      setWrongEmail(false);
      setWrongPassword(false);
      setWrongRePassword(false);
      setWrongUserId(true);
      idRef.current.focus();
      setSubmit(false);
      return;
    }
    if (!password) {
      setErrorMessagePassword("Password is empty");
      setWrongPassword(true);
      setWrongEmail(false);
      setWrongUserId(false);
      setWrongRePassword(false);
      pwRef.current.focus();
      setSubmit(false);
      return;
    }
    if (!regex.test(password)) {
      pwRef.current.focus();
      setSubmit(false);
      return;
    }
    if (password != repassword) {
      repwRef.current.value = "";
      setWrongPassword(true);
      setWrongEmail(false);
      setWrongUserId(false);
      setWrongRePassword(true);
      repwRef.current.focus();
      setSubmit(false);
      return;
    }
    password = await bcrypt.hash(password, 10);
    // console.log(password);
    try {
      const { data } = await instance.post("signup", {
        email,
        userId,
        password,
      });
      setSubmit(false);
      setWrongEmail(false);
      setWrongUserId(false);
      setWrongRePassword(false);
      setWrongPassword(false);
      if (data.message === "success") {
        console.log("varify your account with your email");
        setSuccess(true);
        setOpen(true);
      }
    } catch (e) {
      setOpen(true);
      setSuccess(false);
      setSubmit(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={emailRef}
                  error={wrongEmail}
                  helperText={wrongEmail ? errorMessageEmail : null}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={idRef}
                  error={wrongUserId}
                  helperText={wrongUserId ? errorMessageUserId : null}
                  id="userId"
                  label="User ID"
                  name="userId"
                  autoComplete="id"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={pwRef}
                  onChangeCapture={() => {
                    if (!regex.test(pwRef.current.value)) {
                      setWrongPassword(true);
                    } else {
                      setWrongPassword(false);
                    }
                  }}
                  error={wrongPassword}
                  helperText={wrongPassword ? errorMessagePassword : null}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={repwRef}
                  error={wrongRePassword}
                  helperText={wrongRePassword ? errorMessageRePassword : null}
                  name="repassword"
                  label="confirm Password"
                  type="password"
                  id="repassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {submit ? (
              <LoadingButton
                loadingIndicator={
                  <CircularProgress color="primary" size={16} />
                }
                onClick={() => console.log("hi")}
                endIcon={<SendIcon />}
                loading={true}
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                loadingPosition="end"
                variant="contained"
                color="error"
              >
                Sign Up
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => props.navigate("./login")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Snackbar
          anchorOrigin={{ vertical: "button", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          {success ? (
            <Alert
              onClose={() => setOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Receive the verify email
            </Alert>
          ) : (
            <Alert
              onClose={() => setOpen(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              Sign up failed
            </Alert>
          )}
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
