import React from "react";
import io from "socket.io-client";
import dotenv from "dotenv-defaults";
import { useDispatch } from "react-redux";
import { Joingame } from "./features/session/sessionSlices";

const WEBSOCKET_URL = window.location.href;
// const API_ROOT = new URL("/api", window.location.href);

dotenv.config();

function socketProvider() {}

export const socket = io(WEBSOCKET_URL);
export const SocketContext = React.createContext(socket);
