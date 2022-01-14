import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    login: false,
    userId: null,
    roomId: "",
    socketEvent: [],
  },
  reducers: {
    Login: (state, action) => {
      state.login = true;
      state.userId = action.payload.userId;
      state.roomId = action.payload.roomId;
    },
    Logout: (state) => {
      state.login = false;
    },
    Joingame: (state, action) => {
      console.log(action.payload);
      state.roomId = action.payload.roomId;
    },
    Addevent: (state, action) => {
      state.socketEvent.push(action.payload.event);
    },
  },
});

export const { Login, Logout, Joingame, Addevent } = sessionSlice.actions;

export default sessionSlice.reducer;
