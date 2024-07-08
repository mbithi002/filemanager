import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userFilesSlice from "./useFilesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userFiles: userFilesSlice,
  },
});

export default store;
