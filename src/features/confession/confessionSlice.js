import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebase } from "react-redux-firebase";
import { ALL } from "../../utils/Tags";
import { confessionSchema } from "../../utils/schema";

export const createConfession = createAsyncThunk(
  "confessions/createConfessionStatus",
  async ({ content, tags, shareAs, profile }, { getState }) => {
    const { currentUser } = getState().auth;

    const confessionsRef = getFirebase().ref("confessions");
    const key = confessionsRef.push().key;

    const confession = {
      id: key,
      content,
      tags,
      shareAs,
      timestamp: getFirebase().database.ServerValue.TIMESTAMP,
      numberOfLikes: 0,
      numberOfDislikes: 0,
      user: {
        uid: currentUser.uid,
        username: currentUser.displayName,
        photoURL: currentUser.photoURL,
        gender: profile.gender,
      },
      favorites: {
        [currentUser.uid]: 0,
      },
      feelings: {
        [currentUser.uid]: 0,
      },
    };

    const validate = await confessionSchema.validateAsync(confession);

    const result = confessionsRef.child(key).set(confession);

    const savedConfession = await confessionsRef
      .child(key)
      .once("value")
      .then((snapShot) => {
        return snapShot.val();
      });

    return savedConfession;
  }
);

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
  extraReducers: {
    [createConfession.fulfilled]: (state, action) => {
      state.confessions.concat(action.payload);
    },
  },
});

export const { setCurrentCategory } = confessionSlice.actions;

export default confessionSlice.reducer;
