import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "../features/auth/authSlice";
import confessionReducer from "../features/confession/confessionSlice";

export default configureStore({
  reducer: {
    firebase: firebaseReducer,
    auth: authReducer,
    confessions: confessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
