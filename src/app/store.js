import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionSlices";
export default configureStore({
  reducer: {
    session: sessionReducer,
  },
});
