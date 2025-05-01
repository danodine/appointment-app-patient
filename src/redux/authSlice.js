import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BASE_URL, VERSION_URL } from "../../config";

const USER_URL = `${BASE_URL}${VERSION_URL}/users`;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_URL}/login`, {
        email,
        password,
      });
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
    loading: {
      login: false,
      signup: false,
      changePassword: false,
    },
    error: {
      login: null,
      signup: null,
      changePassword: null,
    },
  },
  reducers: {
    clearLoginError: (state) => {
      state.error.login = null;
    },
    clearSignupError: (state) => {
      state.error.signup = null;
    },
    clearChangePasswordError: (state) => {
      state.error.changePassword = null;
    },
    clearAllErrors: (state) => {
      state.error = {
        login: null,
        signup: null,
        changePassword: null,
      };
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.loading= {
        login: false,
        signup: false,
        changePassword: false,
      };
      state.error = {
        login: null,
        signup: null,
        changePassword: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading.login = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading.signup = true;
        state.error.signup = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading.signup = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading.signup = false;
        state.error.signup = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading.changePassword = true;
        state.error.changePassword = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading.changePassword = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading.changePassword = false;
        state.error.changePassword = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.loading = {
          login: false,
          signup: false,
          changePassword: false,
        };
        state.error = {
          login: null,
          signup: null,
          changePassword: null,
        };
      });
  },
});

export const {
  clearLoginError,
  clearSignupError,
  clearChangePasswordError,
  clearAllErrors,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;
