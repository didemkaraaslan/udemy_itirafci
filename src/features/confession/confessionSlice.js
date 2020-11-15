import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebase } from "react-redux-firebase";
import { ALL } from "../../utils/Tags";
import { confessionSchema } from "../../utils/schema";

export const fetchConfessions = createAsyncThunk(
  "confessions/fetchConfessionsStatus",
  async (_, {}) => {
    const data = await getFirebase()
      .database()
      .ref("confessions")
      .once("value")
      .then((snapShot) => {
        let confessions = [];
        snapShot.forEach((snap) => {
          confessions.push(snap.val());
        });

        return confessions;
      });

    return data;
  }
);

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

    const result = await confessionsRef.child(key).set(confession);

    const savedConfession = await confessionsRef
      .child(key)
      .once("value")
      .then((snapShot) => {
        console.log(snapShot);
        return snapShot.val();
      });

    return savedConfession;
  }
);

export const likeConfession = createAsyncThunk(
  "confessions/likeConfessionStatus",
  async (confession, { getState, rejectWithValue }) => {
    const { currentUser } = getState().auth;
    const currentUserUid = currentUser.uid;

    let userReaction = confession.feelings[currentUserUid];
    userReaction = userReaction === null ? 0 : userReaction;
    const userAlreadyLiked = userReaction === 1;

    if (!userAlreadyLiked) {
      const result = await getFirebase()
        .database()
        .ref(`confessions/${confession.id}`)
        .transaction(function (update) {
          if (update) {
            update.feelings[currentUserUid] = 1;
            update.numberOfLikes = update.numberOfLikes + 1;
            update.numberOfDislikes =
              userReaction === 0
                ? update.numberOfDislikes
                : update.numberOfDislikes - 1;
          }

          return update;
        });

      return { confessionId: confession.id, currentUserUid, userReaction };
    } else {
      return rejectWithValue("Already Liked");
    }
  }
);

export const dislikeConfession = createAsyncThunk(
  "confessions/dislikeConfessionStatus",
  async (confession, { getState, rejectWithValue }) => {
    const { currentUser } = getState().auth;
    const currentUserUid = currentUser.uid;

    let userReaction = confession.feelings[currentUserUid];
    userReaction = userReaction === null ? 0 : userReaction;
    const userAlreadyDisliked = userReaction === -1;

    if (!userAlreadyDisliked) {
      const result = await getFirebase()
        .database()
        .ref(`confessions/${confession.id}`)
        .transaction(function (update) {
          if (update) {
            update.feelings[currentUserUid] = -1;
            update.numberOfDislikes = update.numberOfDislikes + 1;
            update.numberOfLikes =
              userReaction === 0
                ? update.numberOfLikes
                : update.numberOfLikes - 1;
          }
          return update;
        });
      return { confessionId: confession.id, currentUserUid, userReaction };
    } else {
      console.log("Rejected");
      return rejectWithValue("Already Disliked");
    }
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
      console.log("hello");
      console.log(action.payload);
      state.confessions.push(action.payload);
    },
    [fetchConfessions.pending]: (state, action) => {
      state.loading = "pending";
    },
    [fetchConfessions.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.confessions = action.payload;
    },
    [fetchConfessions.rejected]: (state, action) => {
      state.loading = "idle";
    },
    [likeConfession.fulfilled]: (state, action) => {
      const { confessionId, currentUserUid, userReaction } = action.payload;

      const confession = state.confessions.find(
        (confession) => confession.id === confessionId
      );

      confession.feelings[currentUserUid] = 1;
      confession.numberOfLikes = confession.numberOfLikes + 1;
      confession.numberOfDislikes =
        userReaction === 0
          ? confession.numberOfDislikes
          : confession.numberOfDislikes - 1;
    },
    [dislikeConfession.fulfilled]: (state, action) => {
      const { confessionId, currentUserUid, userReaction } = action.payload;

      const confession = state.confessions.find(
        (confession) => confession.id === confessionId
      );

      confession.feelings[currentUserUid] = -1;
      confession.numberOfDislikes = confession.numberOfDislikes + 1;
      confession.numberOfLikes =
        userReaction === 0
          ? confession.numberOfLikes
          : confession.numberOfLikes - 1;
    },
  },
});

export const { setCurrentCategory } = confessionSlice.actions;

export default confessionSlice.reducer;
