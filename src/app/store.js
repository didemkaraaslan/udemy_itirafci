import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';

export default configureStore({
  reducer: {
    firebase: firebaseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
