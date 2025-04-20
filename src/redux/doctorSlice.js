import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchDoctors = createAsyncThunk(
  "doctors/searchDoctors",
  async ({ text }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://192.168.0.63:3000/api/v1/users/search?q=${text}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctorsList: [],
    loading: false,
    error: null,
  },
    reducers: {
      clearSearch: (state) => {
        state.doctorsList = [];
        state.loading = false;
        state.error = null;
      },

    },
  extraReducers: (builder) => {
    builder
      .addCase(searchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorsList = action.payload.data;
      })
      .addCase(searchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearch } = doctorSlice.actions;
export default doctorSlice.reducer;
