import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Typography, Box, Divider, Button, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const About = () => {
  const events = [
    {
      year: "Phase 1",
      title: "Register/Login",
      description: "Create an account or log in to access games and features.",
    },
    {
      year: "Phase 2",
      title: "Explore Games",
      description: "Browse games, view details, and pick one to book.",
    },
    {
      year: "Phase 3",
      title: "Book the Game",
      description: "Choose your game, check slots, and confirm your booking.",
    },
    {
      year: "Phase 4",
      title: "Get Tournament Details",
      description: "Find your Tournament ID and password on 'My Challenges'.",
    },
    {
      year: "Phase 5",
      title: "Game Rules",
      description: "You can only book one game at a time for fair play.",
    },
    {
      year: "Phase 6",
      title: "Winner Announcement",
      description: "Check the leaderboard to see the winners after the game.",
    },
    {
      title: "Update Details",
      description: "Update your profile information on the Stats page.",
    },
    {
      title: "Technical Support",
      description: "Contact us for help via email or the Contact page.",
    },
  ];

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: theme.spacing(2),
          left: theme.spacing(3),
          zIndex: 1300,
        }}
      >
        <Button
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: 2,
            padding: "0.5rem 1rem",
            textTransform: "none",
            color: "white",
            borderColor: "white",
            fontSize:{xs:"16px",md:"20px"},
            "&:hover": {
              borderColor: "lightgray",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "#222D34",
          width: "90%",
          height: "auto",
          margin: { xs: "4.5rem 1.3rem", md: "4.5rem 3.5rem" },
          boxSizing: "border-box",
          padding: { xs: "0", md: "2rem" },
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: "white",
            // marginBottom: "2rem",
            marginBottom: { xs: "3rem", md: "1rem" },
            paddingTop: { xs: "2rem" },
            fontSize: { xs: "1.5rem", md: "2.5rem" }, // Smaller font for mobile
          }}
        >
          About Our Platform
        </Typography>
        <Timeline position="alternate">
          {events.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <CheckCircleIcon />
                </TimelineDot>
                {index !== events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Box mb={4} textAlign={index % 2 === 0 ? "right" : "left"}>
                  <Typography
                    variant="h6"
                    fontStyle="italic"
                    sx={{
                      color: "white",
                      fontSize: { xs: "0.9rem", md: "1.25rem" }, // Adjusted for mobile
                    }}
                  >
                    {event.year}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      color: "white",
                      fontSize: { xs: "1.25rem", md: "1.75rem" }, // Smaller for mobile
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontSize: { xs: "0.875rem", md: "1rem" }, // Smaller for mobile
                    }}
                  >
                    {event.description}
                  </Typography>
                </Box>
                {index !== events.length - 1 && (
                  <Divider sx={{ backgroundColor: "white" }} />
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
      <Footer />
    </>
  );
};

export default About;
