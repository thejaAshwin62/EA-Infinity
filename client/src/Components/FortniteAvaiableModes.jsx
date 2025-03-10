import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import FortniteIcon from "../assets/fortniteicon.svg";

const FortniteAvaiableModes = () => {
  const modes = [
    {
      title: "Standard Mode",
      description: "Solo, Duos, Trios, Squads",
      color: "#FEE47E",
    },
    {
      title: "Zero Build",
      description: "Solo, Duos, Trios, Squads",
      color: "red",
    },
    {
      title: "Party Royale",
      description: "Squads",
      color: "#90EE90",
    },
    {
      title: "Del Mar",
      description: "Competitive Rotation (Racing)",
      color: "#FEE47E",
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
                    src={FortniteIcon}
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

export default FortniteAvaiableModes;
