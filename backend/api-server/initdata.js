import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import { User } from "../models/user.js";
import Game from "../models/game.js";
import bcrypt from "bcryptjs";

dotenv.config();
console.log(process.env.MONGO_URL);

const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const datas = [
  {
    userId: "1",
    password: "1",
    email: "1@gmail.com",
    status: "offline",
    gameId: "",
    friend: ["2", "3"],
  },
  {
    userId: "2",
    password: "2",
    email: "2@gmail.com",
    status: "offline",
    gameId: "",
  },
  {
    userId: "3",
    password: "3",
    email: "3@gmail.com",
    status: "offline",
    gameId: "",
  },
  {
    userId: "4",
    password: "4",
    email: "4@gmail.com",
    status: "offline",
    gameId: "",
  },
];

const games = [
  {
    id: "123",
    players: [
      {
        playerId: "ric",
        playerHand: [1, 2, 3],
        playerJob: 2,
      },
      {
        playerId: "jerry",
        playerHand: [5, 8, 9],
        playerJob: 1,
      },
      {
        playerId: "johnny",
        playerHand: [13, 20, 44],
        playerJob: 5,
      },
    ],
    difficulty: "Normal",
    playerDeck: [11, 12, 14, 15, 16],
    discardPlayerDeck: [20, 21, 22],
    virusDeck: [1, 2, 3, 4],
    discardVirusDeck: [5, 6, 7],
    activeVirus: [1, 2, 3, 4],
    virus: [],
  },
  {
    id: "789",
    players: [
      {
        playerId: "123",
        playerHand: [1, 2, 3],
        playerJob: 2,
      },
      {
        playerId: "tim",
        playerHand: [5, 8, 9],
        playerJob: 1,
      },
      // {
      //   playerId: "jack",
      //   playerHand: [13, 20, 44],
      //   playerJob: 5,
      // },
    ],
    difficulty: "Hard",
    playerDeck: [11, 12, 14, 15, 16],
    discardPlayerDeck: [20, 21, 22],
    virusDeck: [1, 2, 3, 4],
    discardVirusDeck: [5, 6, 7],
    activeVirus: [1, 2, 3, 4],
    virus: [],
  },
];
// datas.forEach(async (data) => {
//   data.password = await bcrypt.hash(data.password, 10);
//   console.log(data.password);
// });

db.once("open", async () => {
  console.log("db connected");
  await User.deleteMany({});
  datas.forEach(async (data) => {
    data.password = await bcrypt.hash(data.password, 10);
    const user = new User(data);
    user.save();
  });
  games.forEach(async (game) => {
    await Game.deleteMany({});
    const gameData = new Game(game);
    gameData.save();
  });
  console.log("finish saving data");
});
