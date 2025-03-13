import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        {/* Left Section: Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SMART ATTENDANCE MANAGEMENT SYSTEM
        </Typography>

        {/* Right Section: Login/Logout & Sign Up */}

          <Button color="inherit" component={Link} to="/register">
            REGISTER PARTICIPANT
          </Button>
          <Button color="inherit" component={Link} to="/attend">
            CAPTURE ATTENDANCE
          </Button>
          <Button color="inherit" component={Link} to="/reports">
            REPORTS
          </Button>
          <Button color="inherit" component={Link} to="/">
            HOME
          </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
