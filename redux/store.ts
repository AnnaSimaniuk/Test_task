import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import usersReducer from "./features/users-slice";

export const store = configureStore({
  reducer: {
    authReducer,
    usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
