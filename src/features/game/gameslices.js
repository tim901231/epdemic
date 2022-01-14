import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    players: [],
  },
  reducers: {
    Room: (state, action) => {
      state.players = action.payload.players;
    },
  },
});

export const { Login, Logout, Joingame, Addevent } = gameSlice.actions;

export default gameSlice.reducer;
