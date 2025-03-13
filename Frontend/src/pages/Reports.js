import React from "react";
import { Box, Grid, Typography, Button, TextField, Paper } from "@mui/material";
import ReportsDashboard from "../components/ReportsDashbord";
import cloud from "../assets/cloud.jpg"
const Reports = () => {
  return (
    <Box>
      <Grid container alignItems="center" justifyContent="center" sx={{ minHeight: "80vh", px: 4 }}>
        <Grid item xs={12} md={6}>
          <img
            src={cloud}
            alt="Cloud Management Config."
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>


        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              REPORTS
            </Typography>
                <ReportsDashboard />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
