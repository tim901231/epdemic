import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import instance from "../instance";
import ResponsiveAppBar from "./appbar";
import { Snackbar, Alert, Stack } from "@mui/material";

const theme = createTheme({
  palette: {
    quickStart: {
      main: "#ffc107",
      contrastText: "#fff",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "15vh",
  padding: "3.5vh",
  marginBottom: "3vh",
}));

function HomePage(props) {
  const [open, setOpen] = useState(false);
  console.log(useSelector((state) => state.session));
  const login = useSelector((state) => state.session.login);
  const userId = useSelector((state) => state.session.userId);
  const roomId = useSelector((state) => state.session.roomId);
  const dispatch = useDispatch();
  console.log(userId, roomId);
  return (
    <div>
      <ResponsiveAppBar navigate={props.navigate} />

      <Grid
        container
        spacing={2}
        paddingLeft={"2vw"}
        paddingRight={"2vw"}
        mt={"3vh"}
      >
        <Grid item xs={5}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                sx={{
                  fontSize: "2.8vw",
                  mt: "1vh",
                  mb: "2.5vh",
                  textAlign: "center",
                }}
                color="text.secondary"
                gutterBottom
              >
                ????????????
              </Typography>
              <Typography
                sx={{ fontSize: "1.5vw", mb: "2.5vh" }}
                color="text.secondary"
              >
                ??????????????????????????????????????????????????????????????????
              </Typography>
              <Typography sx={{ fontSize: "1vw" }}>
                ?????????????????????????????????????????????????????????????????????????????????4???????????????????????????
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1.2vw" }}>
                <br />
                ???????????????????????????????????????
                <br />
                <Grid container spacing={0.5}>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ fontSize: "1vw" }}>
                      1. ??????/??????
                      <br />
                      3. ????????????
                      <br />
                      5. ???????????????
                      <br />
                      7. ????????????
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ fontSize: "1vw" }}>
                      2. ????????????
                      <br />
                      4. ????????????
                      <br />
                      6. ????????????
                      <br />
                      8. ????????????
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                ???????????????????????????
                <br />
                <Grid container spacing={0.5}>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ fontSize: "1vw" }}>
                      1. ?????????
                      <br />
                      3. ?????????
                      <br />
                      5. ????????????
                      <br />
                      7. ??????????????????
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ fontSize: "1vw" }}>
                      2. ?????????
                      <br />
                      4. ????????????
                      <br />
                      6. ????????????
                      <br />
                      8. ??????
                    </Typography>
                  </Grid>
                </Grid>
                {/* {'"a benevolent smile"'} */}
              </Typography>
              <br />
              <Typography
                sx={{ fontSize: "1.2vw", mb: "0.2vh", mt: "1.2vh" }}
                gutterBottom
              >
                ?????????????????????
              </Typography>
              <Link href="https://boardgamearena.com/link?url=https%3A%2F%2Fgamesoncloud.blogspot.com%2F2014%2F08%2Fpandemic.html&id=12657">
                ????????????
              </Link>
              <br />
              <Link href="https://boardgamearena.com/link?url=https%3A%2F%2Fwww.zmangames.com%2Fen%2Fproducts%2Fpandemic%2F&id=10284">
                English Rulebook
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Stack spacing={2}>
            <Card>
              <CardMedia
                component="img"
                sx={{ maxWidth: "57.5vw", maxHeight: "57.5vh" }}
                image="https://i.imgur.com/Q2UZka4.jpg"
                alt="pandemic board game"
              />
            </Card>
            {/* <div>
              <img
                src="https://i.imgur.com/Q2UZka4.jpg"
                max-width={"10%"}
                height={"auto"}
              ></img>
            </div> */}
            <Item elevation={3}>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  // color="quickStart"
                  style={{ width: "20vw", height: "15vh", fontSize: "2.5vw" }}
                  onClick={async () => {
                    if (!login) {
                      props.navigate("./login");
                    }
                    try {
                      await instance.post("/createRoom", {
                        userId: userId,
                        difficulty: "normal",
                      });
                    } catch (e) {
                      setOpen(true);
                    }
                  }}
                >
                  QuickStart
                </Button>
              </ThemeProvider>
            </Item>
          </Stack>
        </Grid>
      </Grid>

      {/* <button
        onClick={async () => {
          const data = await instance.get("/session");
          console.log(data);
        }}
      >
        get session
      </button>
      <button
        onClick={() => {
          instance.post("/login", { userId: "1", password: "1" });
        }}
      >
        send session
      </button>
      <button
        onClick={() => {
          instance.delete("/login");
        }}
      >
        delete session
      </button>
      {login ? <div>{userId}</div> : <div>Not login yet</div>}
      <button onClick={() => props.navigate("/login")}>go to login page</button>
      <button onClick={() => props.navigate("/game")}>go to game</button> */}
      <Snackbar
        anchorOrigin={{ vertical: "button", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Already in game
        </Alert>
      </Snackbar>
    </div>
  );
}
export default HomePage;
