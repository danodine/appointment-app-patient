import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, VERSION_URL } from "../../config"; 
import axios from "axios";

const USER_ENDPOINT = `${BASE_URL}${VERSION_URL}/users`;

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${USER_ENDPOINT}/me`);
      return response.data.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "An error has occurred");
    }
  }
);

function appendSimpleFields(formData, userData) {
  for (const key in userData) {
    if (key !== "profileImageUri" && key !== "profile") {
      formData.append(key, userData[key]);
    }
  }
}

function appendProfileFields(formData, profile) {
  if (!profile) return;

  const { address, medicalConditions, ...rest } = profile;

  if (address) {
    formData.append("profile.address.street", address.street);
    formData.append("profile.address.city", address.city);
    formData.append("profile.address.country", address.country);
  }

  if (medicalConditions) {
    formData.append("profile.medicalConditions", JSON.stringify(medicalConditions));
  }

  for (const key in rest) {
    formData.append(`profile.${key}`, rest[key]);
  }
}

function appendPhoto(formData, uri) {
  if (!uri) return;

  const name = uri.split("/").pop();
  const ext = name.split(".").pop();
  const type = `image/${ext}`;

  formData.append("photo", { uri, name, type });
}

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      appendSimpleFields(formData, userData);
      appendProfileFields(formData, userData.profile);
      appendPhoto(formData, userData.profileImageUri);

      const response = await axios.patch(`${BASE_URL}${VERSION_URL}/users/updateMe`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
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
    },
    error: {
      get: null,
      update: null,
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
      });
  },
});

export const { clearUserError, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
