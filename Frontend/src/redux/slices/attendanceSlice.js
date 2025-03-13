import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/attendance";

// Check-in attendance
export const checkInAttendance = createAsyncThunk(
  "attendance/checkIn",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/checkin`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to log attendance");
    }
  }
);

// Fetch attendance records (optional: with date range)
export const fetchAttendanceRecords = createAsyncThunk(
  "attendance/fetchRecords",
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/records`, { params: { startDate, endDate } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch records");
    }
  }
);

// Fetch attendance summary
export const fetchAttendanceSummary = createAsyncThunk(
  "attendance/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/summary`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch summary");
    }
  }
);

// Fetch user-specific attendance history
export const fetchUserAttendanceHistory = createAsyncThunk(
  "attendance/fetchUserHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user history");
    }
  }
);

// Fetch absentee report
export const fetchAbsenteeReport = createAsyncThunk(
  "attendance/fetchAbsentees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/absentees`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch absentee report");
    }
  }
);

// Fetch attendance trends (weekly/monthly)
export const fetchAttendanceTrends = createAsyncThunk(
  "attendance/fetchTrends",
  async (period, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/trends`, { params: { period } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch attendance trends");
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    records: [],
    summary: null,
    userHistory: [],
    absentees: [],
    trends: [],
    checkInStatus: "idle",
    checkInError: null,
    fetchStatus: "idle",
    fetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check-in attendance
      .addCase(checkInAttendance.pending, (state) => {
        state.checkInStatus = "loading";
        state.checkInError = null;
      })
      .addCase(checkInAttendance.fulfilled, (state) => {
        state.checkInStatus = "succeeded";
      })
      .addCase(checkInAttendance.rejected, (state, action) => {
        state.checkInStatus = "failed";
        state.checkInError = action.payload;
      })

      // Fetch attendance records
      .addCase(fetchAttendanceRecords.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.records = action.payload;
      })
      .addCase(fetchAttendanceRecords.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      })

      // Fetch attendance summary
      .addCase(fetchAttendanceSummary.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.summary = action.payload;
      })
      .addCase(fetchAttendanceSummary.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      })

      // Fetch user-specific attendance history
      .addCase(fetchUserAttendanceHistory.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchUserAttendanceHistory.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.userHistory = action.payload;
      })
      .addCase(fetchUserAttendanceHistory.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      })

      // Fetch absentee report
      .addCase(fetchAbsenteeReport.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAbsenteeReport.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.absentees = action.payload;
      })
      .addCase(fetchAbsenteeReport.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      })

      // Fetch attendance trends
      .addCase(fetchAttendanceTrends.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAttendanceTrends.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.trends = action.payload;
      })
      .addCase(fetchAttendanceTrends.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
