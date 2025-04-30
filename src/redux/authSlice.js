import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BASE_URL, VERSION_URL } from "../../config";

const USER_URL = `${BASE_URL}${VERSION_URL}/users`;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_URL}/login`, { email, password });
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
      street,
      city,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${USER_URL}/signup`, {
        name,
        email,
        password,
        passwordConfirm,
        nationalId,
        birthDate,
        role: "patient",
        phone,
        profile: {
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

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { passwordCurrent, password, passwordConfirm },
    { rejectWithValue }
  ) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.patch(
        `${USER_URL}/updateMyPassword`,
        { passwordCurrent, password, passwordConfirm },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { token: newToken, data } = response.data;
      const user = data.user;

      await SecureStore.setItemAsync("token", newToken);
      return { token: newToken, user };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password change failed"
      );
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
    loginError: null,
    signupError: null,
    changePasswordError: null,
  },
  reducers: {
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearSignupError: (state) => {
      state.signupError = null;
    },
    clearChangePasswordError: (state) => {
      state.changePasswordError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.signupError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signupError = action.payload;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.changePasswordError = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.changePasswordError = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export const { clearLoginError, clearSignupError, clearChangePasswordError } =
  authSlice.actions;
export default authSlice.reducer;
