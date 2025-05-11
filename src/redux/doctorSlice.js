import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const searchDoctors = createAsyncThunk(
  "doctors/searchDoctors",
  async ({ text }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/search?q=${text}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  }
);

export const getDoctorById = createAsyncThunk(
  "doctors/byId",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/doctor/${id}`);
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
    doctor: {},
    loading: {
      search: false,
      getById: false,
    },
    error: {
      search: null,
      getById: null,
    },
  },
  reducers: {
    clearSearch: (state) => {
      state.doctorsList = [];
      state.loading.search = false;
      state.error.search = null;
    },
    clearById: (state) => {
      state.doctor = {};
      state.loading.getById = false;
      state.error.getById = null;
    },
    clearDoctorError: (state) => {
      state.error.getById = null;
      state.error.search = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDoctors.pending, (state) => {
        state.loading.search = true;
        state.error.search = null;
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.loading.search = false;
        state.doctorsList = action.payload.data;
      })
      .addCase(searchDoctors.rejected, (state, action) => {
        state.loading.search = false;
        state.error.search = action.payload;
      })
      .addCase(getDoctorById.pending, (state) => {
        state.loading.getById = true;
        state.error.getById = null;
      })
      .addCase(getDoctorById.fulfilled, (state, action) => {
        state.loading.getById = false;
        state.doctor = action.payload.data;
      })
      .addCase(getDoctorById.rejected, (state, action) => {
        state.loading.getById = false;
        state.error.getById = action.payload;
      });
  },
});

export const { clearSearch, clearById, clearDoctorError } = doctorSlice.actions;
export default doctorSlice.reducer;
