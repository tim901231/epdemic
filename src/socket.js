import React from "react";
import io from "socket.io-client";
import dotenv from "dotenv-defaults";
import { useDispatch } from "react-redux";
import { Joingame } from "./features/session/sessionSlices";
import { WEBSOCKET_URL } from "./constants/constants";

// const WEBSOCKET_URL = "localhost:5000";
// const WEBSOCKET_URL = window.location.href;
// const API_ROOT = new URL("/api", window.location.href);

export const socket = io(WEBSOCKET_URL);
export const SocketContext = React.createContext(socket);
