import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import bcrypt from "bcryptjs";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import instance from "../instance";
import { useState } from "react";
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

export default function ResetPw(props) {
  const [sent, setSent] = useState(false);
  const [Message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 18,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {sent ? <MailIcon /> : <QuestionMarkIcon />}
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={async (event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                if (data.get("password") !== data.get("password2")) {
                  setMessage("Password not same");
                  return;
                }
                let password = data.get("password");
                password = await bcrypt.hash(password, 10);
                setLoading(true);
                instance
                  .post("/resetpw", {
                    password,
                    secretToken: window.location.search,
                  })
                  .then((res) => {
                    setSent(true);
                    setMessage("Password Reset");
                    setLoading(false);
                    props.navigate("./login");
                  })
                  .catch((err) => {
                    setSent(true);
                    setLoading(false);
                    setMessage("Failed to reset password");
                  });
              }}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                type="password"
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password2"
                label="Confirm password"
                name="password2"
                autoComplete="password2"
              />

              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {sent ? Message : "Reset"}
              </LoadingButton>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
