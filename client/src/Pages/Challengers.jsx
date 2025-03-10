import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import ChallengeCard from "../Components/ChallengeCard";
import Leaderboard from "../Components/LeaderBoard";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "./Dashboard";
import { FaUserCircle } from "react-icons/fa";
import Empty from "../assets/empty.svg";
import { Link } from "react-router-dom";

const Challengers = () => {
  const { user, registeredGames } = useDashboardContext();
  const gameId = registeredGames[0]?.id;

  const [registeredPlayers, setRegisteredPlayers] = useState([]);

  useEffect(() => {
    const fetchRegisteredPlayers = async () => {
      try {
        const response = await customFetch(`/users/${gameId}/registered-users`);
        setRegisteredPlayers(response.data.game.registeredUsers);
      } catch (error) {
        console.error("Failed to fetch registered players:", error);
      }
    };

    fetchRegisteredPlayers();
  }, [registeredGames]);

  const capitalizeFirstLetter = (string) => {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Navbar />
      <Typography
        sx={{
          display: { xs: "block", md: "none" },
          textAlign: "center",
          color: "white",
          marginBottom: "-4rem",
        }}
      ></Typography>
      {registeredGames && registeredGames.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "60%",
              objectFit: "contain",
              marginTop: "8rem",
             
            }}
            src={Empty}
            alt=""
          />

          <Typography sx={{ color: "white", marginTop: "2rem" }}>
            You have not booked any games
          </Typography>
          <Link to="/allgames">
            <Button sx={{ marginTop: "1rem" }}>Book</Button>
          </Link>
        </div>
      ) : (
        <div>
          <Box
            sx={{
              backgroundColor: "#222D34",
              width: "100%",
              height: "auto",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "5rem",
              padding: "1rem 2rem",
            }}
          >
            {/* ChallengeCard - First row on mobile */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                marginBottom: { xs: "1rem", md: "0" },
                margin: { xs: "1", md: "2rem" },
              }}
            >
              <ChallengeCard />
            </Box>

            {/* Player List Box - Second row on mobile */}
            <Box
              sx={{
                backgroundColor: "#161D22",
                borderRadius: "8px",
                padding: "1rem",
                color: "white",
                overflowY: "auto",
                flexShrink: 0,
                width: { xs: "100%", md: "500px" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginBottom: "1rem", textAlign: "center" }}
              >
                Registered Players
              </Typography>
              <List>
                {registeredPlayers.map((player, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      borderRadius: "8px",
                      backgroundColor: "#222D34",
                    }}
                  >
                    {player.avatar ? (
                      <ListItemAvatar>
                        <img
                          src={player.avatar}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "8px",
                          }}
                        />
                      </ListItemAvatar>
                    ) : (
                      <FaUserCircle size={40} style={{ marginRight: "8px" }} />
                    )}

                    <ListItemText
                      primary={capitalizeFirstLetter(player.name)}
                      secondary={
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <Typography variant="body2" color="white">
                              Mode: {player.mode}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body2" color="white">
                              Skill: {capitalizeFirstLetter(player.status)}
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <Box>
            <Leaderboard />
          </Box>
        </div>
      )}
    </>
  );
};

export default Challengers;
