import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import attendanceReducer from "./slices/attendanceSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    records: attendanceReducer,
  },
});

export default store;
