import React from "react";
import io from "socket.io-client";
import dotenv from "dotenv-defaults";
import { useDispatch } from "react-redux";
import { Joingame } from "./features/session/sessionSlices";

const WEBSOCKET_URL = "localhost:5000";

dotenv.config();

function socketProvider() {}

export const socket = io(WEBSOCKET_URL);
export const SocketContext = React.createContext(socket);
