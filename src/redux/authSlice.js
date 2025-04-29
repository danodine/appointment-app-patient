import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const LOGIN_URL = "http://192.168.0.63:3000/api/v1/users/login";
const SIGNUP_URL = "http://192.168.0.63:3000/api/v1/users/signup";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      const { token, data } = response.data;
      const user = data.user;
      await SecureStore.setItemAsync("token", token);
      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    {
      name,
      email,
      password,
      passwordConfirm,
      nationalId,
      birthDate,
      phone,
      age,
      street,
      city,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(SIGNUP_URL, {
        name,
        email,
        password,
        passwordConfirm,
        nationalId,
        birthDate,
        role: "patient",
        phone,
        profile: {
          age,
          address: {
            street,
            city,
            country: "ecuador",
          },
        },
      });
      const { token, data } = response.data;
      const user = data.user;
      await SecureStore.setItemAsync("token", token);
      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await SecureStore.deleteItemAsync("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
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
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
