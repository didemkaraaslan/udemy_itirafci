import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    firebase: firebaseReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
