import React, { useEffect, useState, useRef } from "react";
import Appbar from "./appbar";
import instance from "../instance";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Login, Joingame, Addevent } from "../features/session/sessionSlices";
import useGame from "../Hooks/useGame";
import io from "socket.io-client";
import { Animation } from "react-konva";
import { socket, SocketContext } from "../socket";
import Konva from "konva";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Paper,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const WEBSOCKET_URL = "localhost:5000";
export default function Room(props) {
  const [rooms, setRooms] = useState([]);
  const userId = useSelector((state) => state.session.userId);
  const roomId = useSelector((state) => state.session.roomId);
  const login = useSelector((state) => state.session.login);
  const socketEvent = useSelector((state) => state.session.socketEvent);
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);

  const dispatch = useDispatch();
  console.log(players);
  const wsRef = useRef(null);
  // const { connectWebSocket, joinRoom, ws } = useGame();
  useEffect(() => {
    let user;
    const fetch = async () => {
      user = await instance.get("/session");
      if (user.data) {
        // console.log(user.data);
        dispatch(Login({ userId: user.data.userId, roomId: user.data.gameId }));
        // console.log(user.data);
      } else {
        props.navigate("./login");
      }
    };

    fetch().then(() => {
      console.log(user.data);
      wsRef.current = io(WEBSOCKET_URL);

      wsRef.current.on("room", (data) => {
        console.log(data.players);
        setPlayers([...data.players]);
      });
      wsRef.current.on("gameStarted", () => {
        props.navigate(`./game?gameId=${user.data.gameId}`);
      });
      wsRef.current.emit("room", user.data.gameId);
    });

    //dispatch(Addevent({ event: "room" }));

    return () => wsRef.current.disconnect();
  }, []);
  //   useEffect(() => {
  //     if (roomId.length > 0) {
  //       console.log("hi");
  //     }
  //   }, [login]);

  // if (roomId.length > 0) {
  //   props.navigate(`./room?roomId=${roomId}`);
  // }

  return (
    <>
      <Appbar navigate={props.navigate} />
      {/* <button
        onClick={() => {
          ws.emit("room", roomId);
        }}
      >
        test
      </button> */}
      {/* <Box
        sx={{
          width: 300,
          height: 400,
          border: "1px dashed grey",
          mx: 0,
          padding: 0,
        }}
      >
        hello
      </Box>
      <Box sx={{ width: 300, height: 400 }}>hello2</Box> */}
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid item xs={3} mt={7} ml={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">難度</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Difficulty"
            >
              <MenuItem>Easy</MenuItem>
              <MenuItem>Normal</MenuItem>
              <MenuItem>Hard</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid ml={2} mt={5} xs={8} sx={{ height: "100%" }}>
          <Stack mt={4} spacing={2} sx={{ height: "100%" }}>
            {players.map((player) => (
              //<button>{player.playerId}</button>
              <Card
                sx={{ minWidth: 600, height: "10%", alignContent: "cneter" }}
              >
                <CardContent sx={{ alignItems: "center" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Item>{player.playerId}</Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>{"Players："}</Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>{"Difficulty："}</Item>
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="contained"
              // color="quickStart"
              style={{
                width: "20vw",
                height: "15vh",
                fontSize: "2.5vw",
              }}
              onClick={async () => {
                if (!login) {
                  props.navigate("./login");
                }

                wsRef.current.emit("startGame", roomId);
              }}
            >
              Start
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
