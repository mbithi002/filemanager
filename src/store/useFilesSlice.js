import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
};

const userFilesSlice = createSlice({
  name: "userFiles",
  initialState,
  reducers: {
    setUserFiles(state, action) {
      state.files = action.payload.files;
    },
  },
});

export const { setUserFiles, setTotalFiles } = userFilesSlice.actions;


export default userFilesSlice.reducer;
