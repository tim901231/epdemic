import React, { useEffect } from "react";
import useGame from "../Hooks/useGame";
import Appbar from "./appbar";
import webSocket from "socket.io-client";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import instance from "../instance";
import { Login } from "../features/session/sessionSlices";
import MoveSelector from "../Components/moveSelector";
import CheckIcon from "@mui/icons-material/Check"; // import { job } from "../constants/job.js";
import {
  List,
  ListSubheader,
  ListItemButton,
  Rating,
  ListItemText,
  Grid,
  Card,
  Button,
  Typography,
  Modal,
  Box,
  stepIconClasses,
} from "@mui/material";
import io from "socket.io-client";
import GameBoard from "../Components/gameBoard";
import { cities } from "../constants/cities";
import { jobs } from "../constants/job";

const WEBSOCKET_URL = "http://localhost:5000";
const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// console.log(job);
function Game(props) {
  const wsRef = useRef(null);
  const roomId = useSelector((state) => state.session.roomId);
  const userId = useSelector((state) => state.session.userId);
  const [city, setCity] = useState(0);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const dispatch = useDispatch();
  const {
    who,
    me,
    leftMove,
    virus,
    players,
    others,
    pos,
    lab,
    setLab,
    setPos,
    setOthers,
    setPlayers,
    setWho,
    setMe,
    setLeftMove,
    setPlayerDeck,
    setDiscardPlayerDeck,
    setVirusDeck,
    setDiscardVirusDeck,
    setVirus,
  } = useGame();
  useEffect(() => {
    let user;
    const fetch = async () => {
      user = await instance.get("/session");
      if (user.data) {
        dispatch(Login({ userId: user.data.userId, roomId: user.data.gameId }));
      }
    };
    fetch().then(() => {
      wsRef.current = io(WEBSOCKET_URL);
      // wsRef.current.on("room", (data) => {
      //   console.log(data.players);
      //   setPlayers([...data.players]);
      // });

      wsRef.current.on("gameDetail", (data) => {
        console.log(data);
        setOthers(
          data.players.filter((player) => player.playerId !== user.data.userId)
        );
        setMe(
          data.players.filter((player) => player.playerId === user.data.userId)
        );
        // setPos(data.pos);
        setLab(data.lab);
        setPos(data.players.map((player) => player.pos));
        setPlayers(data.players);
        setVirus(data.virus);
        setWho(data.who);
        setPlayerDeck(data.playerDeck);
        setDiscardPlayerDeck(data.discardplayerDeck);
        setVirusDeck(data.virusDeck);
        setDiscardVirusDeck(data.discardvirusDeck);
      });
      wsRef.current.on("drawPlayerDeck", (data) => {
        setPlayerDeck(data.playerDeck);
        setDiscardPlayerDeck(data.discardplayerDeck);
      });
      wsRef.current.on("drawvirusDeck", (data) => {
        setVirusDeck(data.virusDeck);
        setDiscardVirusDeck(data.discardvirusDeck);
      });
      wsRef.current.on("setVirus", (data) => {
        setVirus(data.virus);
      });
      wsRef.current.on("setWho", (data) => {
        setWho(data.who);
      });
      wsRef.current.on("setLeftMove", (data) => {
        setLeftMove(data.leftMove);
      });
      wsRef.current.emit("queryGame", user.data.gameId);
    });
    // console.log(others);
    //dispatch(Addevent({ event: "room" }));
    // console.log(others);
    return () => wsRef.current.disconnect();
  }, []);
  // console.log(players);
  // console.log(who);
  const move = () => {
    console.log("move", roomId, city);
    wsRef.current.emit("move", { gameId: roomId, city });
  };
  const fly = () => {
    wsRef.current.emit("fly", { gameId: roomId, city });
  };
  const flyfrom = () => {
    wsRef.current.emit("flyfrom", { gameId: roomId, city });
  };
  const build_lab = () => {
    wsRef.current.emit("lab", { gameId: roomId, city });
  };
  const treat = () => {
    wsRef.current.emit("treat", { gameId: roomId });
  };
  return (
    <div>
      <Appbar navigate={props.navigate} />
      {/* <button onClick={() => props.navigate("/")}>back to homepage</button>
      <button onClick={() => joinRoom("1")}>click me to add room</button>
      <button
        onClick={() =>
          startGame({
            gameId: "123",
            playersId: ["1", "2", "3", "4"],
            playerNum: 4,
            level: "normal",
          })
        }
      >
        get game data
      </button> */}
      <Grid container>
        <Grid item xs={8.5}>
          <GameBoard
            players={players}
            virus={virus}
            who={who}
            leftMove={leftMove}
            setCity={setCity}
          ></GameBoard>
        </Grid>
        <Grid item xs={3.5}>
          <Grid container>
            <Grid item xs={6.5}>
              <MoveSelector
                city={city}
                pos={pos[who] ? pos[who] : 2}
                hand={players[who] ? players[who].playerHand : []}
                move={move}
                fly={fly}
                flyfrom={flyfrom}
                lab={build_lab}
                treat={treat}
              ></MoveSelector>
              {/* 456 */}
              {/* <Grid innerContainer>
            <Grid item xs={8}>
              <MoveSelector></MoveSelector>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Player 1
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Job: Medic
                </Typography>
              </Card>
            </Grid> */}
              {/* </Grid> */}
            </Grid>
            <Grid item xs={4.5} mt={"20px"} mr={"10px"}>
              <Card>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {others[0] && players[who] ? (
                    players[who].playerId === others[0].playerId ? (
                      <CheckIcon />
                    ) : null
                  ) : null}
                  {others[0] ? others[0].playerId : null}
                  {others[0] ? "：" + cities[others[0].pos].name : null}
                </Typography>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Job: {others[0] ? jobs[others[0].playerJob] : null}
                </Typography>
                <Button
                  ml={"10px"}
                  onClick={() => {
                    setCurrent(others[0]);
                    setOpen(true);
                  }}
                >
                  ShowCard
                </Button>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    style={style}
                    sx={{
                      backgroundColor: "white",
                    }}
                  >
                    <Typography
                      ml={2}
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {current ? current.playerId : null}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {current
                        ? current.playerHand.map((card) => (
                            <Button>{cities[card].name}</Button>
                          ))
                        : null}
                    </Typography>
                  </Box>
                </Modal>
              </Card>
              <br />
              <Card>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {others[1] && players[who] ? (
                    players[who].playerId === others[1].playerId ? (
                      <CheckIcon />
                    ) : null
                  ) : null}
                  {others[1] ? others[1].playerId : null}
                  {others[1] ? "：" + cities[others[1].pos].name : null}
                </Typography>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Job: {others[1] ? jobs[others[1].playerJob] : null}
                </Typography>
                <Button
                  onClick={() => {
                    setCurrent(others[1]);
                    setOpen(true);
                  }}
                  ml={"10px"}
                >
                  ShowCard
                </Button>
              </Card>
              <br />
              <Card>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {others[2] && players[who] ? (
                    players[who].playerId === others[2].playerId ? (
                      <CheckIcon />
                    ) : null
                  ) : null}
                  {others[2] ? others[2].playerId : null}
                  {others[2] ? "：" + cities[others[2].pos].name : null}
                </Typography>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Job: {others[2] ? jobs[others[2].playerJob] : null}
                </Typography>
                <Button
                  onClick={() => {
                    setCurrent(others[2]);
                    setOpen(true);
                  }}
                  ml={"10px"}
                >
                  ShowCard
                </Button>
              </Card>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={11}>
            <Card>
              <Typography
                ml={"10px"}
                sx={{ fontSize: 26 }}
                color="text.secondary"
                gutterBottom
              >
                {players[who] ? (
                  players[who].playerId === userId ? (
                    <CheckIcon />
                  ) : null
                ) : null}
                {userId}
                {me.length > 0 ? "：" + cities[me[0].pos].name : null}
              </Typography>
              <Typography
                ml={"10px"}
                sx={{ fontSize: 16 }}
                color="text.secondary"
                gutterBottom
              >
                Job: {me.length > 0 ? jobs[me[0].playerJob] : null}
              </Typography>
              {me.length > 0
                ? me[0].playerHand.map((card) => (
                    <Button>{cities[card].name}</Button>
                  ))
                : null}
            </Card>
            <Button>Labs:</Button>
            {lab.length > 0 ? (
              <>
                {lab.map((item) => {
                  return <Button>{item}</Button>;
                })}
              </>
            ) : (
              "None"
            )}
          </Grid>
          {/* <Card>
            <Typography
              ml={"10px"}
              sx={{ fontSize: 26 }}
              color="text.secondary"
              gutterBottom
            >
              Me
            </Typography>
            <Typography
              ml={"10px"}
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Job: Builder
            </Typography>
          </Card> */}
        </Grid>
      </Grid>

      {/* <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        {[...Array(48).keys()].map((x) => {
          return (
            <ListItemButton>
              <ListItemText primary={x} />
              <Rating
                color="red"
                value={virus1[x] + virus2[x] + virus3[x] + virus4[x]}
                readOnly
              />
            </ListItemButton>
          );
        })}
      </List> */}
    </div>
  );
}
export default Game;
