import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceSummary } from "../redux/slices/attendanceSlice";
import { Box, Typography, Paper, CircularProgress, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const AttendanceSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { summary, loading, error } = useSelector((state) => state.records);

  useEffect(() => {
    dispatch(fetchAttendanceSummary());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Attendance Summary
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : summary ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Total Users: {summary.totalRecords}</Typography>
          <Typography variant="h6" color="green">Present: {summary.presentCount}</Typography>
          <Typography variant="h6" color="red">Absent: {summary.absentCount}</Typography>
        </Paper>
      ) : null}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        component={Link}
        to="/attend-records"
      >
        View Attendance Records
      </Button>
    </Box>
  );
};

export default AttendanceSummary;
