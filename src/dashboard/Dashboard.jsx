import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { auth } from "../firebaseConfig";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      {user ? (
        <>
          <Avatar src={user.photoURL} alt={user.displayName} sx={{ width: 100, height: 100 }} />
          <Typography variant="h6" component="h2">
            Welcome, {user.displayName}
          </Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Button variant="contained" color="primary" onClick={handleSignOut} sx={{ mt: 3 }}>
            Sign Out
          </Button>
        </>
      ) : (
        <Typography variant="body1">No user data available</Typography>
      )}
    </Box>
  );
};

export default Dashboard;