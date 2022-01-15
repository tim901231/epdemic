import express from "express";
import cors from "cors";
// import session from "express-session";
import apiRouter from "./backend/api-server/api.js";
import http from "http";

// import redis from "ioredis";
import mongoose from "mongoose";
// import connectRedis from "connect-redis";
// import { v4 as uuid_v4 } from "uuid";
import dotenv from "dotenv-defaults";
import { dirname } from "path";
import { Server } from "socket.io";
import init from "./backend/socket-server/src/init.js";
import Game from "./backend/models/game.js";
import { User } from "./backend/models/user.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// const REDIS_PORT = 6379;
// const redisClient = new redis({ host: "redis" });
// redisClient.on("error", (e) => console.log(e));
// const secret = uuid_v4();
// const RedisStore = connectRedis(session);
// const sessionOption = {
//   secret,
//   store: new RedisStore({ client: redisClient }),
//   resave: false,
//   saveUninitialized: false,
// };

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   //res.header("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(cors());
// app.use(session(sessionOption));
app.use(express.json());
app.use("/api", apiRouter);
console.log(apiRouter);
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = http.createServer(app);

// const io = new Server(server);

const db = mongoose.connection;

console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log("MongoDB connected");
  // io.on("connection", (socket) => {
  //   console.log("a user connected");
  //   socket.on("getMessage", (arg) => {
  //     console.log(arg);
  //   });
  //   socket.on("room", async (roomId) => {
  //     console.log(roomId);
  //     socket.join(roomId);
  //     const game = await Game.findOne({ id: roomId });
  //     console.log("Hello");
  //     if (!game) {
  //       return;
  //     }
  //     const { players, difficulty } = game;
  //     io.emit("room", { players, difficulty });
  //   });
  //   socket.on("joinRoom", async ({ userId, roomId }) => {
  //     console.log("joinRoom");
  //     console.log(userId);
  //     const game = await Game.findOne({ id: roomId });
  //     const user = await User.findOne({ userId: userId });
  //     if (userId === null) {
  //       console.log("Player not login yet");
  //       io.emit("addRoom", { msg: "failed", gameId: "" });
  //       return;
  //     }
  //     if (game.players.length < 4) {
  //       if (user.gameId === "") {
  //         socket.join(roomId);

  //         console.log("successful join room");
  //         io.emit("addRoom", { msg: "successful", gameId: roomId });
  //         game.players.push({ playerId: userId, playerHand: [], playerJob: 0 });
  //         console.log(game);
  //         game.save();
  //         user.gameId = roomId;
  //         user.save();
  //         const { player, difficulty } = game;
  //         io.to(roomId).emit("room", { player, difficulty });
  //       } else {
  //         console.log("Player already in game");
  //         io.emit("addRoom", { msg: "failed", gameId: "" });
  //       }
  //     } else {
  //       console.log("Player already full");
  //       io.emit("addRoom", { msg: "failed", gameId: "" });
  //     }
  //   });
  //   socket.on("queryGame", async (gameId) => {
  //     console.log("data queried");
  //     console.log(gameId);
  //     const data = await Game.findOne({ id: gameId });
  //     if (!data) {
  //       return;
  //     }
  //     console.log(data);
  //     io.emit("gameDetail", data);
  //   });
  //   socket.on("startGame", (gameId) => {
  //     console.log("game has started");
  //     const data = init(gameId);
  //     io.to(gameId).emit("gameStarted");
  //     //io.emit("gameDetail", data);
  //   });
  //   socket.on("disconnect", (socket) => {
  //     console.log("a user disconnected");
  //   });
  // });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Listen at port: ${PORT}`);
  });
});
