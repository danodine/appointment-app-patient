import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, VERSION_URL } from "../../config";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {appendProfileFields, appendSimpleFields, appendPhoto} from "../utils/helpers"

const USER_ENDPOINT = `${BASE_URL}${VERSION_URL}/users`;

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${USER_ENDPOINT}/me`);
      return response.data.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "An error has occurred"
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

      const response = await axios.patch(
        `${USER_ENDPOINT}/updateMe`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const deleteMe = createAsyncThunk(
  'user/deleteMe',
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${USER_ENDPOINT}/deleteMe`);
       await SecureStore.deleteItemAsync("token");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error deleting user');
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: {},
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
  },
  reducers: {
    clearUserError: (state) => {
      state.error = { get: null, update: null };
    },
    clearCurrentUser: (state) => {
      state.currentUser = {};
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
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
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

export const { clearUserError, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
