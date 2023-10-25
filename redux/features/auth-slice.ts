import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "@/redux/services/auth";

type InitialState = {
  value: AuthState;
  loading: boolean;
  error: string | null | undefined;
};

type AuthState = {
  isAuth: boolean;
};

const initialState = {
  loading: false,
  error: null,
  value: {
    isAuth: false,
  } as AuthState,
} as InitialState;

const authAdapter = createEntityAdapter<InitialState>();

export const authSlice = createSlice({
  name: "auth",
  initialState: authAdapter.getInitialState(initialState),
  reducers: {
    logout: (state) => {
      return {
        ...state,
        value: {
          isAuth: false,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.value = {
          isAuth: true,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Invalid username or password";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
