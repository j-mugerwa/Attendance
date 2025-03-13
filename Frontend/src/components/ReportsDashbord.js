import React from "react";
import { Grid, Paper, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ReportsDashboard = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        REPORTS DASHBOARD
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            sx={{ py: 2, px: 4, fontSize: "1rem" }}
            component={Link}
            to="/registered"
          >
            Registered Users
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            sx={{ py: 2, px: 4, fontSize: "1rem" }}
            component={Link}
            to="/attend-reports"
          >
            Attendance Reports
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReportsDashboard;
