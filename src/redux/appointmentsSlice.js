import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUpcommingAppointments = createAsyncThunk(
  "appointments/upcomming",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://192.168.0.63:3000/api/v1/appointments/user/upcomming/${userId}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  },
);

export const getPasstAppointments = createAsyncThunk(
  "appointments/passt",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://192.168.0.63:3000/api/v1/appointments/user/passt/${userId}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  },
);

export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async ({ appointmentId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://192.168.0.63:3000/api/v1/appointments/${appointmentId}/cancel`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Cancelation failed",
      );
    }
  },
);

export const fetchAvailableDates = createAsyncThunk(
  "appointments/availableDates",
  async ({ doctorId, location }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://192.168.0.63:3000/api/v1/appointments/available-dates/${doctorId}/${location}`,
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load available dates",
      );
    }
  },
);

export const fetchAvailableTimes = createAsyncThunk(
  "appointments/availableTimes",
  async ({ doctorId, date, location }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://192.168.0.63:3000/api/v1/appointments/available-times/${doctorId}/${date}/${location}`,
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load available times",
      );
    }
  },
);
export const bookAppointment = createAsyncThunk(
  "appointments/bookAppointment",
  async (
    { doctor, doctorName, doctorSpeciality, dateTime, location },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `http://192.168.0.63:3000/api/v1/appointments/new`,
        { doctor, doctorName, doctorSpeciality, dateTime, location },
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load available times",
      );
    }
  },
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    upcommingAppointmentsList: [],
    passtAppointmentsList: [],
    loading: false,
    error: null,
    availableDates: [],
    availableTimes: [],
    calendarLoading: false,
  },
  reducers: {
    clearUpcommingAppointments: (state) => {
      state.upcommingAppointmentsList = [];
      state.loading = false;
      state.error = null;
    },
    clearPasstAppointments: (state) => {
      state.passtAppointmentsList = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUpcommingAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcommingAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.upcommingAppointmentsList = action.payload.data.appointments;
      })
      .addCase(getUpcommingAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPasstAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPasstAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.passtAppointmentsList = action.payload.data.appointments;
      })
      .addCase(getPasstAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAvailableDates.pending, (state) => {
        state.calendarLoading = true;
      })
      .addCase(fetchAvailableDates.fulfilled, (state, action) => {
        state.calendarLoading = false;
        state.availableDates = action.payload;
      })
      .addCase(fetchAvailableDates.rejected, (state, action) => {
        state.calendarLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchAvailableTimes.pending, (state) => {
        state.calendarLoading = true;
      })
      .addCase(fetchAvailableTimes.fulfilled, (state, action) => {
        state.calendarLoading = false;
        state.availableTimes = action.payload;
      })
      .addCase(fetchAvailableTimes.rejected, (state, action) => {
        state.calendarLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUpcommingAppointments, clearPasstAppointments } =
  appointmentsSlice.actions;
export default appointmentsSlice.reducer;
