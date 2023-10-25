import { request } from "@/lib/utils/request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IParams } from "@/types/IParams";
import { IUser } from "@/types/IUser";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (payload: IParams) => {
    const response = await request({
      url: `/table/?limit=${payload.limit}&offset=${payload.offset}`,
      method: "GET",
    });
    return response.data;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (payload: IUser) => {
    const response = await request({
      url: `/table/${payload.id}/`,
      method: "PUT",
      body: payload,
    });
    return response.data;
  }
);
