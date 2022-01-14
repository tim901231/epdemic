import React, { useEffect, useState, useRef } from "react";
import Appbar from "./appbar";
import instance from "../instance";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Login, Joingame, Addevent } from "../features/session/sessionSlices";
import useGame from "../Hooks/useGame";
import { SocketContext } from "../socket";
import io from "socket.io-client";

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
export default function Rooms(props) {
  const [rooms, setRooms] = useState([]);
  const userId = useSelector((state) => state.session.userId);
  const roomId = useSelector((state) => state.session.roomId);
  const socketEvent = useSelector((state) => state.session.socketEvent);
  const [open, setOpen] = useState(false);
  const wsRef = useRef(null);

  const dispatch = useDispatch();
  // const { connectWebSocket, joinRoom, ws } = useGame();
  useEffect(() => {
    const fetch = async () => {
      const user = await instance.get("/session");
      if (user.data) {
        dispatch(Login({ userId: user.data.userId, roomId: user.data.gameId }));
        console.log(user.data);
        try {
          if (user.data.userId) {
            const roomId = await instance.post("/room", {
              userId,
            });
            if (roomId.data.roomId.length > 0) {
              props.navigate(`./room?roomId=${roomId.data.roomId}`);
            }
          }
        } catch (e) {}
      }
      const { data } = await instance.get("/rooms");
      setRooms(data);
    };
    wsRef.current = io(WEBSOCKET_URL);
    wsRef.current.on("addRoom", (data) => {
      console.log(data);
      //console.log(socketEvent);
      instance.post("/joinRoom", { gameId: data.gameId });
      dispatch(Joingame({ roomId: data.gameId }));
      props.navigate(`./room?roomId=${roomId}`);
      //dispatch(Addevent({ event: "addRoom" }));
    });

    fetch();
    return () => wsRef.current.disconnect();
  }, []);
  // if (roomId.length > 0) {
  //   props.navigate(`./room?roomId=${roomId}`);
  // }

  return (
    <>
      <Appbar navigate={props.navigate} />
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
      <Grid container spacing={2} sx={{ height: "80vh" }}>
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
            {rooms.map((room) => (
              <Card
                sx={{ minWidth: 600, height: "10%", alignContent: "cneter" }}
              >
                <CardContent sx={{ alignItems: "center" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Item>{room.name}</Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        {"Players："}
                        {`${room.player} / ${room.capacity}`}
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        {"Difficulty："}
                        {room.difficulty}
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        sx={{ float: "right" }}
                        onClick={() => {
                          wsRef.current.emit("joinRoom", {
                            userId,
                            roomId: room.name,
                          });
                        }}
                      >
                        Join Room
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
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
          Join room failed
        </Alert>
      </Snackbar>
    </>
  );
}
