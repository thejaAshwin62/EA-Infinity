import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

const AvaiableModes = () => {
  const modes = [
    {
      title: "Unrated",
      description: "1v1, 2v2, 5v5 battle against players",
      color: "#FEE47E",
      image: "https://img.icons8.com/arcade/64/valorant.png",
    },
    {
      title: "Spike Rush",
      description: "1v1 5v5 against players",
      color: "red",
      image: "https://img.icons8.com/arcade/64/valorant.png",
    },
    {
      title: "Deathmatch",
      description: "Solo battle against players",
      color: "#90EE90",
      image: "https://img.icons8.com/arcade/64/valorant.png",
    },
    {
      title: "Escalation",
      description: "5v5 Team Deathmatch mode",
      color: "#FEE47E",
      image: "https://img.icons8.com/arcade/64/valorant.png",
    },
  ];

  return (
    <Box sx={{ marginTop: "2rem", padding: "0 1rem" }}>
      <Grid container spacing={2} justifyContent="center">
        {modes.map((mode, index) => (
          <Grid item xs={6} sm={4} key={index}>
            <Card
              sx={{
                background: "#222D34",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "64px",
                      height: "64px",
                      objectFit: "contain",
                    }}
                    src={mode.image}
                    alt={mode.title}
                  />
                  <Box
                    component="span"
                    sx={{
                      marginTop: "8px",
                      fontSize: "18px",
                      color: mode.color,
                    }}
                  >
                    {mode.title}
                  </Box>
                  <Typography
                    fontSize="14px"
                    padding="7px"
                    sx={{ color: "white" }}
                  >
                    {mode.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvaiableModes;
