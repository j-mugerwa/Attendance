import React from "react";
import { Grid, Button, Paper } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";

const Actions = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
      <Grid container spacing={2} justifyContent="center">
        {/* First Column */}
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<DashboardIcon />}
            component={Link}
            to="/attend-reports"
            sx={{ py: 2, fontSize: "1.2rem" }}
          >
            Dashboard
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<BarChartIcon />}
            component={Link}
            to="/reports"
            sx={{ mt: 2, py: 2, fontSize: "1.2rem" }}
          >
            Reports
          </Button>
        </Grid>
        {/* Second Column */}
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            startIcon={<PersonAddIcon />}
            component={Link}
            to="/register"
            sx={{ py: 2, fontSize: "1.2rem" }}
          >
            Register User
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            startIcon={<HowToRegIcon />}
            component={Link}
            to="/attend"
            sx={{ mt: 2, py: 2, fontSize: "1.2rem" }}
          >
            Capture Attend
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Actions;
