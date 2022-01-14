import express from "express";
import cors from "cors";
// import session from "express-session";
import apiRouter from "./backend/api-server/api.js";
// import redis from "ioredis";
import mongoose from "mongoose";
// import connectRedis from "connect-redis";
// import { v4 as uuid_v4 } from "uuid";
import dotenv from "dotenv-defaults";
import { dirname } from "path";

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
const db = mongoose.connection;

console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log("MongoDB connected");
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Listen at port: ${PORT}`);
  });
});
