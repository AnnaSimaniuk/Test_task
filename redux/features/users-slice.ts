import { IUser } from "@/types/IUser";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { editUser, getUsers } from "@/redux/services/users";

type InitialState = {
  value: UsersState;
  loading: boolean;
  error: string | null | undefined;
};
type UsersState = {
  results: IUser[];
  count: number;
  next?: string;
  previous?: string;
};

const initialState = {
  loading: false,
  error: null,
  value: {
    results: [],
    count: 0,
    next: "",
    previous: "",
  } as UsersState,
} as InitialState;

const usersAdapter = createEntityAdapter<InitialState>();

export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.value = {
          results: action.payload.results,
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        };
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = null;
        state.value = {
          results: state.value.results.map((user) => {
            if (user.id === action.payload.id) {
              return action.payload;
            }
            return user;
          }),
          count: state.value.count,
          next: state.value.next,
          previous: state.value.previous,
        };
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
