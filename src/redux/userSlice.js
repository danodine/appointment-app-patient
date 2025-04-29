import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, VERSION_URL } from "../../config"; 
import axios from "axios";

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${VERSION_URL}/users/me`
      );
      return response.data;
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
      let formData = new FormData();

      for (const key in userData) {
        if (key !== "profileImageUri" && key !== "profile") {
          formData.append(key, userData[key]);
        }
      }

      for (const key in userData.profile) {
        if (key === "address") {
          formData.append("profile.address.street", userData.profile.address.street);
          formData.append("profile.address.city", userData.profile.address.city);
          formData.append("profile.address.country", userData.profile.address.country);
        } else if (key === "medicalConditions") {
          formData.append("profile.medicalConditions", JSON.stringify(userData.profile.medicalConditions));
        } else {
          formData.append(`profile.${key}`, userData.profile[key]);
        }
      }

      // If there's an image file to upload
      if (userData.profileImageUri) {
        const uri = userData.profileImageUri;
        const name = uri.split("/").pop();
        const ext = name.split(".").pop();
        const type = `image/${ext}`;

        formData.append("photo", {
          uri,
          name,
          type,
        });
      }

      const response = await axios.patch(
        `${BASE_URL}${VERSION_URL}/users/updateMe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data.user;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
