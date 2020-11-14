import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebase } from "react-redux-firebase";
import { ALL } from "../../utils/Tags";

export const confessionSlice = createSlice({
  name: "confessions",
  initialState: {
    currentCategory: ALL,
    confessions: [],
    loading: "idle",
  },
  reducers: {
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCurrentCategory } = confessionSlice.actions;

export default confessionSlice.reducer;
