import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
} from "@mui/material";
import { auth } from "../firebaseConfig";
import image1 from "./user.png";
import "./Dashboard.css"; // Import the updated CSS file
import Calendar from "./Calendar";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Box className="dashboard-container">
      {/* Header */}
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography variant="h6" className="header-title">
            Rashtriya Swasthya Sangrakshan
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Navigation Tabs */}
      <Box className="menu-bar">
        <Tabs value={false} textColor="primary" indicatorColor="primary">
          <Tab label="Privacy" />
          <Tab label="Help" />
          <Tab label="History" />
          <Tab label="Activity" />
        </Tabs>
      </Box>

      <Box className="main-layout">
        {/* Left Section */}
        <Box className="left-panel">
          {/* User Profile */}
          <Box className="profile-card">
            <Avatar alt="User" src={image1} className="custom-avatar" />
            <Typography variant="h6">UserName</Typography>
            <div className="details">
              {[
                ["Age", "54"],
                ["Birthday", "19/08/1999"],
                ["Weight", "65kg"],
                ["Height", "178cm"],
                ["Gender", "F"],
                ["Guardian", "Name"],
              ].map(([label, value]) => (
                <div className="detail-box" key={label}>
                  <Typography className="detail-label">{label}</Typography>
                  <Typography className="detail-value">{value}</Typography>
                </div>
              ))}
            </div>
          </Box>

          {/* Allergies Section */}
          <Box className="allergies-card">
            <Typography variant="h6">Allergies</Typography>
            <div className="details">
              {[
                ["Penicillin", "Hives"],
                ["Codeine", "Shortness of breath"],
                ["Bee stings", "Anaphylactic shocks"],
              ].map(([allergen, reaction]) => (
                <div className="detail-box" key={allergen}>
                  <Typography className="detail-label">{allergen}</Typography>
                  <Typography className="detail-value">{reaction}</Typography>
                </div>
              ))}
            </div>
          </Box>
        </Box>

        {/* Right Section */}
        <Box className="right-panel">
          <Typography variant="h4" className="dashboard-title">
            Patient Dashboard
          </Typography>
          <Calendar />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignOut}
            className="signout-button"
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

