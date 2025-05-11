import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import * as SecureStore from "expo-secure-store";
import {
  appendProfileFields,
  appendSimpleFields,
  appendPhoto,
} from "../utils/helpers";
import axiosInstance from "../utils/axiosInstance";

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/me`);
      return response.data.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      appendSimpleFields(formData, userData);
      appendProfileFields(formData, userData.profile);
      appendPhoto(formData, userData.profileImageUri);

      const response = await axiosInstance.patch(
        `/users/updateMe`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteMe = createAsyncThunk(
  "users/deleteMe",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/users/deleteMe`);
      await SecureStore.deleteItemAsync("token");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: {},
    cachedProfileImageUri: null,
    loading: {
      get: false,
      update: false,
      delete: false,
    },
    error: {
      get: null,
      update: null,
      delete: null,
    },
    userBanner: {
      type: null,
      message: null,
    },
  },
  reducers: {
    clearUserError: (state) => {
      state.error = { get: null, update: null };
    },
    clearCurrentUser: (state) => {
      state.currentUser = {};
    },
    setCachedProfileImageUri: (state, action) => {
      state.cachedProfileImageUri = action.payload;
    },
    clearUserBanner: (state) => {
      state.userBanner = {
        type: null,
        message: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading.get = true;
        state.error.get = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading.get = false;
        state.currentUser = action.payload;
        const imageUri = action.payload.profile.photo
          ? `${BASE_URL}/img/users/${action.payload.profile.photo}`
          : null;
        state.cachedProfileImageUri = imageUri;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading.get = false;
        state.error.get = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading.update = false;
        state.currentUser = action.payload;
        const imageUri = action.payload.profile.photo
          ? `${BASE_URL}/img/users/${action.payload.profile.photo}`
          : null;
        state.cachedProfileImageUri = imageUri;
        state.userBanner = {
          type: "success",
          message: "banerSuccess",
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
        state.userBanner = {
          type: "error",
          message: "banerError",
        };
      })

      .addCase(deleteMe.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteMe.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.currentUser = null;
      })
      .addCase(deleteMe.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      });
  },
});

export const { clearUserError, clearCurrentUser, clearUserBanner } =
  userSlice.actions;
export default userSlice.reducer;
