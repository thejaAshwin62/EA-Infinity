import React, { useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Carousel } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDashboardContext } from "./Dashboard";

const videos = [
  {
    src: "https://res.cloudinary.com/thejaodin/video/upload/v1727284042/valorant_qkcbwc.mp4",
    title: "Valorant Tournament",
    description:
      "Valorant, my favorite game, is where I truly unleash my gaming talent. With every match, I dive into the tactical depths of this fast-paced, team-based shooter, blending my strategic mind with razor-sharp reflexes.",
    type: "valorant",
  },
  {
    src: "https://res.cloudinary.com/thejaodin/video/upload/v1727284017/PUBG_lfpeez.mp4",
    title: "PUBG Tournament",
    description:
      "Gear Up, Drop In, and Dominate: Secure Your Spot in the Ultimate PUBG Tournament! This is not just a game; it's a battlefield where only the best can claim victory. As you parachute into the action-packed world",
    type: "pubg_pc",
  },
  {
    src: "https://res.cloudinary.com/thejaodin/video/upload/v1727283950/Fortnite_gniy4x.mp4",
    title: "Fortnite Tournament",
    description:
      "Gear Up, Drop In, and Dominate: Secure Your Spot in the Ultimate PUBG Tournament! This is not just a game; it's a battlefield where only the best can claim victory. As you parachute into the action-packed world",
    type: "fortnite",
  },
];

const AllGames = () => {
  const { user } = useDashboardContext();
  const [menuOpen, setMenuOpen] = useState(false);
console.log(user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#000000",
        backgroundImage: `
          radial-gradient(at 47% 33%, hsl(247.13, 31%, 43%) 0, transparent 59%), 
          radial-gradient(at 82% 65%, hsl(346.67, 79%, 40%) 0, transparent 55)
        `,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "90%",
          height: "80vh",
          backdropFilter: "blur(16px) saturate(200%)",
          WebkitBackdropFilter: "blur(16px) saturate(200%)", // For Safari
          backgroundColor: "rgba(17, 25, 40, 0.21)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 1)",
          display: "flex",
          alignItems: "center",

          "@media (max-width: 768px)": {
            height: "auto", // Adjust to 100% to ensure full viewport on small screens
            width: "90%",
          },
          "@media (max-width: 600px)": {
            height: "auto", // Adjust to 100% to ensure full viewport on small screens
            width: "90%",
          },
          "@media (max-width: 480px)": {
            height: "auto", // Adjust to 100% to ensure full viewport on small screens
            width: "90%",
          },
        }}
      >
        <Carousel
          interval={5000} // Slide interval set to 5 seconds
          controls={true}
          indicators={true} // Show navigation dots
          style={{ width: "100%", height: "100%" }}
        >
          {videos.map((video, index) => (
            <Carousel.Item key={index}>
              <Box
                sx={{
                  width: "110%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="video"
                  autoPlay
                  muted
                  loop
                  sx={{
                    width: "100%",
                    height: {
                      xs: "100vh", // For extra-small screens
                      sm: "100%", // For small and larger screens
                    },
                  }}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </Box>
              </Box>
              <Link to={`/allgames/${video.type}`}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: { xs: "85%", md: "45%" },
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 3, // Ensure it's above other elements
                    fontSize: "1rem",
                    padding: "3px 2rem",
                  }}
                >
                  Explore
                </Button>
              </Link>

              <Carousel.Caption
                style={{
                  position: "absolute",
                  bottom: "30%", // Adjust position as needed
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  textAlign: "center",
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    position: "relative",
                    bottom: { xs: "14rem", md: "12rem" }, // Adjust the distance from the bottom of the video
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#E5E6E4",
                    fontSize: { xs: "28px", md: "50px" },
                    fontWeight: "bold",
                    mb: 2, // Default margin-bottom
                    zIndex: 2, // Ensure it is above the video
                  }}
                >
                  {video.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontSize: "17px",
                    marginBottom: "3rem",
                    "@media (max-width: 730px)": {
                      display: {
                        xs: "none", // Hide description on extra small screens
                        sm: "block", // Show description on small screens and up
                      },
                    },
                  }}
                >
                  {video.description}
                </Typography>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={toggleMenu}
          sx={{
            color: "#E5E6E4",
            zIndex: 101,
            display: { xs: "block", md: "none" },
          }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Box
          sx={{
            display: { xs: menuOpen ? "flex" : "none", md: "flex" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-around" },
            alignItems: { xs: "center", md: "center" },
            position: { xs: "fixed", md: "static" },
            top: 0,
            left: { xs: -80, md: "auto" },
            width: { xs: "100%", md: "100%" },
            height: { xs: "100vh", md: "auto" },
            backgroundColor: { xs: "#161D22", md: "transparent" },
            zIndex: 100,
            marginTop: { xs: "", md: "-1rem" },
          }}
        >
          <Link to="/">
            <Button
              sx={{
                my: 2,

                color: "#E5E6E4",
                "&:hover": {
                  color: "#FFFFFF",
                },
              }}
            >
              Home
            </Button>
          </Link>

          <Link to="/allgames/challenges">
            <Button
              sx={{
                my: 2,
                color: "#E5E6E4",
                "&:hover": {
                  color: "#FFFFFF",
                },
              }}
            >
              My Challenges
            </Button>
          </Link>

          {user.role === "admin" && (
            <Link to="/allgames/admin">
              <Button
                sx={{
                  my: 2,
                  color: "#E5E6E4",
                  "&:hover": {
                    color: "#ffffff",
                  },
                }}
              >
                Admin
              </Button>
            </Link>
          )}

          <Link to="/allgames/stats">
            <Button
              sx={{
                my: 2,
                color: "#E5E6E4",
                "&:hover": {
                  color: "#FFFFFF",
                },
              }}
            >
              Stats
            </Button>
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "20vh",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
          zIndex: 1,
        }}
      />
      <Outlet />
    </Box>
  );
};

export default AllGames;
