import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, VERSION_URL } from "../../config";

const API_BASE = `${BASE_URL}${VERSION_URL}/appointments`;

export const getUpcomingAppointments = createAsyncThunk(
  "appointments/getUpcoming",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/user/upcoming/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetching upcoming appointments failed");
    }
  }
);

export const getPastAppointments = createAsyncThunk(
  "appointments/getPast",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/user/past/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetching past appointments failed");
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async ({ appointmentId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE}/${appointmentId}/cancel`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Cancellation failed");
    }
  }
);

export const fetchAvailableDates = createAsyncThunk(
  "appointments/fetchAvailableDates",
  async ({ doctorId, location }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/available-dates/${doctorId}/${location}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Loading available dates failed");
    }
  }
);

export const fetchAvailableTimes = createAsyncThunk(
  "appointments/fetchAvailableTimes",
  async ({ doctorId, date, location, duration, currentTime }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ duration, currentTime });
      const url = `${API_BASE}/available-times/${doctorId}/${date}/${location}?${params.toString()}`;
      const response = await axios.get(url);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Loading available times failed");
    }
  }
);

export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async ({ doctor, doctorName, doctorSpeciality, dateTime, location, duration }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/new`, {
        doctor,
        doctorName,
        doctorSpeciality,
        dateTime,
        location,
        duration,
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Booking failed");
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    upcomingAppointmentsList: [],
    pastAppointmentsList: [],
    availableDates: [],
    availableTimes: [],
    loading: {
      upcoming: false,
      past: false,
      calendar: false,
      booking: false,
    },
    error: {
      upcoming: null,
      past: null,
      calendar: null,
      booking: null,
    },
  },
  reducers: {
    clearAppointmentsState: (state) => {
      state.upcomingAppointmentsList = [];
      state.pastAppointmentsList = [];
      state.availableDates = [];
      state.availableTimes = [];
      state.loading = {
        upcoming: false,
        past: false,
        calendar: false,
        booking: false,
      };
      state.error = {
        upcoming: null,
        past: null,
        calendar: null,
        booking: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingAppointments.pending, (state) => {
        state.loading.upcoming = true;
        state.error.upcoming = null;
      })
      .addCase(getUpcomingAppointments.fulfilled, (state, action) => {
        state.loading.upcoming = false;
        state.upcomingAppointmentsList = action.payload.data.appointments;
      })
      .addCase(getUpcomingAppointments.rejected, (state, action) => {
        state.loading.upcoming = false;
        state.error.upcoming = action.payload;
      })
      .addCase(getPastAppointments.pending, (state) => {
        state.loading.past = true;
        state.error.past = null;
      })
      .addCase(getPastAppointments.fulfilled, (state, action) => {
        state.loading.past = false;
        state.pastAppointmentsList = action.payload.data.appointments;
      })
      .addCase(getPastAppointments.rejected, (state, action) => {
        state.loading.past = false;
        state.error.past = action.payload;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.error.booking = action.payload;
      })
      .addCase(fetchAvailableDates.pending, (state) => {
        state.loading.calendar = true;
        state.error.calendar = null;
      })
      .addCase(fetchAvailableDates.fulfilled, (state, action) => {
        state.loading.calendar = false;
        state.availableDates = action.payload;
      })
      .addCase(fetchAvailableDates.rejected, (state, action) => {
        state.loading.calendar = false;
        state.error.calendar = action.payload;
      })
      .addCase(fetchAvailableTimes.pending, (state) => {
        state.loading.calendar = true;
        state.error.calendar = null;
      })
      .addCase(fetchAvailableTimes.fulfilled, (state, action) => {
        state.loading.calendar = false;
        state.availableTimes = action.payload;
      })
      .addCase(fetchAvailableTimes.rejected, (state, action) => {
        state.loading.calendar = false;
        state.error.calendar = action.payload;
      })
      .addCase(bookAppointment.pending, (state) => {
        state.loading.booking = true;
        state.error.booking = null;
      })
      .addCase(bookAppointment.fulfilled, (state) => {
        state.loading.booking = false;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading.booking = false;
        state.error.booking = action.payload;
      });
  },
});

export const { clearAppointmentsState } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
