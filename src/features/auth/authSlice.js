import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirebase } from 'react-redux-firebase';

export const loginUser = createAsyncThunk(
  'auth/loginUserStatus',
  async ({ email, password }) => {
    const response = await getFirebase()
      .auth()
      .signInWithEmailAndPassword(email, password);

    return response.user;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUserStatus',
  async () => {
    return await getFirebase().auth().signOut();
  }
);

export const registerUserAndUpdateProfile = createAsyncThunk(
  'auth/registerUserStatus',
  async ({ username, email, password, gender }) => {
    const usersRef = getFirebase().database().ref('users');

    const [first, last] = username.split(' ');
    const avatarBackground = gender === 'female' ? 'f44259' : '42f498';

    const { user } = await getFirebase()
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const response = await user.updateProfile({
      displayName: username,
      photoURL: `https://ui-avatars.com/api/?name=${first}^${last}&background=${avatarBackground}&color=fff`,
    });

    const result = await usersRef.child(user.uid).set({
      username,
      email,
      gender,
      photoURL: user.photoURL,
    });

    return user;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    loading: 'idle',
    isLoadingUser: true,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLoadingUser = false;
    },
  },
  extraReducers: {
    [registerUserAndUpdateProfile.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [registerUserAndUpdateProfile.fulfilled]: (state, action) => {
      state.loading = 'idle';
    },
    [registerUserAndUpdateProfile.rejected]: (state, action) => {
      state.loading = 'idle';
    },
    [loginUser.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = 'idle';
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = 'idle';
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
