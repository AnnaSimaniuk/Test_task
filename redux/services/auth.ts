import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/lib/utils/request";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { username: string; password: string }) => {
    const response = await request({
      url: "/login/",
      method: "POST",
      body: payload,
    });
    return response.data;
  }
);
