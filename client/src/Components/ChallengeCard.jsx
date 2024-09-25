import * as React from "react";
import cimg from "../assets/challengecard.png";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, Grid, Typography } from "@mui/material";
import { useDashboardContext } from "../Pages/Dashboard";

const cardStyle = {
  width: { xs: "90%", md: "28rem" }, // Responsive width
  height: { xs: "auto", md: "25rem" }, // Responsive height
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  color: "white",
  backgroundColor: "#161D22",
  margin: { xs: "1rem auto", md: "0 1rem" }, // Center on mobile, spaced on desktop
  padding: { xs: "1rem", md: "0" }, // Add padding for mobile
};

const backgroundImageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${cimg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(3px)",
  zIndex: 0,
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(3px)",
  zIndex: 1,
};

const headerStyle = {
  position: "relative",
  zIndex: 2,
  padding: "1rem",
};

const priceStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  color: "white",
  padding: "0.4rem 1rem",
  borderRadius: "10px",
  fontSize: "1rem",
  backdropFilter: "blur(12px)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export default function ChallengeCard() {
  const { registeredGames } = useDashboardContext();
  // console.log(registeredGames);

  return (
    <Grid
      container
      justifyContent={{ xs: "center", md: "flex-start" }}
      spacing={2}
    >
      {registeredGames.map((game) => {
        const totalSlots = game.slots || 0;
        const registeredUsersCount = game.registeredUsers?.length || 0;

        return (
          <Grid item xs={12} sm={6} md={4} key={game._id}>
            <Card sx={cardStyle}>
              <Box sx={backgroundImageStyle}></Box>
              <Box sx={overlayStyle}></Box>
              <Box sx={headerStyle}>
                <CardHeader
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  title={
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        color: "#FFF9E3",
                      }}
                    >
                      {game.mode}
                    </Typography>
                  }
                  subheader={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          ID : {game.cardId}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          PS : {game.cardPassword}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={priceStyle}>
                        Price : ${game.winPrice}
                      </Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Typography>
                    {game.name === "pubg_pc" ? (
                      <h4>PUBG</h4>
                    ) : game.name === "valorant" ? (
                      <h4>VALORANT</h4>
                    ) : game.name === "fortnite" ? (
                      <h4>FORTNITE</h4>
                    ) : (
                      <h2></h2>
                    )}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ color: "white", padding: "1rem 0" }}
                  >
                    An immersive battle against a player conducted as a Friendly
                    session
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", padding: "4px" }}
                  >
                    Today {game.starting}:00 PM
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", fontSize: "1rem" }}
                  >
                    Players : {registeredUsersCount}/{totalSlots}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
