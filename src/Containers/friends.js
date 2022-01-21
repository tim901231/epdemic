import React, { useEffect, useState, useRef } from "react";
import Appbar from "./appbar";
import instance from "../instance";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
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
  InputBase,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { WEBSOCKET_URL } from "../constants/constants";
// const WEBSOCKET_URL = "localhost:5000";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Friends(props) {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const userId = useSelector((state) => state.session.userId);
  const wsRef = useRef(null);
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  //console.log(userId);

  const onChange = (event) => {
    console.log(event.target.value);
    setNewFriend(event.target.value);
  };

  const handleAddFriend = async () => {
    console.log(userId);
    console.log(newFriend);
    await instance.post("/addFriend", {
      userId,
      newFriend,
    });
    //inputRef.target.value = "";
    const buddy = await instance.post("/getFriend", { userId });
    console.log(buddy.data);
    setFriends(buddy.data);
    setNewFriend("");
  };

  const handleDeleteFriend = async (name) => {
    await instance.post("/deleteFriend", {
      userId,
      name,
    });
    const buddy = await instance.post("/getFriend", { userId });
    console.log(buddy.data);
    setFriends(buddy.data);
  };

  const handleInviteFriend = async (name) => {
    const room = await instance.post("/room", { userId });
    const roomId = room.data.roomId;
    console.log(roomId);

    wsRef.current.emit("inviteJoinRoom", {
      friendId: name,
      roomId: roomId,
    });
    // await instance.post("/addFriend", {
    //   userId,
    //   newFriend,
    // });
  };

  useEffect(() => {
    if (!userId) {
      props.navigate("./login");
    }

    const fetch = async () => {
      let buddy = [];
      buddy = await instance.post("/getFriend", {
        userId,
      });
      console.log(buddy.data);
      setFriends(buddy.data);
    };
    wsRef.current = io(WEBSOCKET_URL);
    wsRef.current.on("addRoom", (data) => {
      // console.log(data);
      // //console.log(socketEvent);
      // instance.post("/joinRoom", { gameId: data.gameId });
      // dispatch(Joingame({ roomId: data.gameId }));
      // props.navigate(`./room?roomId=${roomId}`);
      //dispatch(Addevent({ event: "addRoom" }));
    });

    fetch();
  }, []);

  return (
    <>
      <Appbar navigate={props.navigate} />
      <Grid container spacing={2} sx={{ height: "80vh" }}>
        <Grid item xs={3} mt={7} ml={3}>
          <Paper
            component="form"
            sx={{
              p: "0.8vh 0.5vw",
              display: "flex",
              alignItems: "center",
              width: "20vw",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search ID for Friends"
              onChange={onChange}
              ref={inputRef}
              inputProps={{ "aria-label": "search for friends" }}
            />
            <IconButton
              // type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleAddFriend}
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid ml={2} mt={5} xs={8} sx={{ height: "100%" }}>
          {/* <Typography
            sx={{
              fontSize: "2.8vw",
              mt: "1vh",
              mb: "2.5vh",
              textAlign: "center",
            }}
            color="text.secondary"
            gutterBottom
          >
            找朋友
          </Typography> */}
          <Stack mt={4} spacing={2} sx={{ height: "100%" }}>
            {friends.map((friend) => (
              <Card
                sx={{ minWidth: 600, height: "10%", alignContent: "center" }}
              >
                <CardContent sx={{ alignItems: "center" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Item>{friend.name}</Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>{friend.status}</Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        sx={{ float: "right" }}
                        //disabled={friend.status === "signUp" ? false : true}
                        onClick={() => handleInviteFriend(friend.name)}
                      >
                        Invite to game
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        sx={{ float: "right" }}
                        onClick={() => handleDeleteFriend(friend.name)}
                      >
                        Delete friend
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
