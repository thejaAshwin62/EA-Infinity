import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faMedal,
  faMedal as faThirdPlace,
} from "@fortawesome/free-solid-svg-icons";
import customFetch from "../utils/customFetch"; // Custom fetch utility
import { useDashboardContext } from "../Pages/Dashboard";

const rankIcons = {
  1: faCrown,
  2: faMedal,
  3: faThirdPlace,
};

const Leaderboard = () => {
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useDashboardContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customFetch.get("/users/all-users"); // Fetch from the users API

        setRegisteredPlayers(response.data.users); // Update the players with fetched data
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch registered players.");
        setLoading(false);
      }
    };

    fetchUsers(); // Call fetch function on component mount
  }, []);

  if (loading) {
    return (
      <Box sx={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
        Loading...
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
        {error}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#161D22",
        borderRadius: "8px",
        padding: { xs: "1rem", md: "1.5rem" }, // Adjust padding for mobile and desktop
        color: "white",
        width: { xs: "95%", md: "80%" }, // Full width on mobile, smaller on desktop
        margin: "2rem auto",
        maxWidth: "800px",
        maxHeight: "25rem",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: "1rem", textAlign: "center" }}
      >
        Leaderboard
      </Typography>
      <List>
        {registeredPlayers
          .slice(0, 3) // Only take the top 3 players for leaderboard
          .map((player, index) => (
            <ListItem
              key={player._id}
              sx={{
                marginBottom: "1rem",
                padding: "0.5rem",
                borderRadius: "8px",
                backgroundColor:
                  index + 1 === 1
                    ? "#FFD700"
                    : index + 1 === 2
                    ? "#C0C0C0"
                    : "#CD7F32",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#3E4C59" }}>{player.avatar}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={rankIcons[index + 1]}
                      style={{ marginRight: "0.5rem" }}
                    />
                    {`${index + 1}. ${player.name}`}
                  </Box>
                }
                secondary={
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={4}>
                      {" "}
                      {/* Adjust for mobile and desktop */}
                      <Typography variant="body2" color="white">
                        Mode: {player.mode || "N/A"}{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Typography variant="body2" color="white">
                        Skill: {player.status.toUpperCase() || "N/A"}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Leaderboard;
