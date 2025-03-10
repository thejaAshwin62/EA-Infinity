import React, { createContext } from "react";
import { Box, Typography } from "@mui/material";
import bg from "../assets/Valorant.jpeg";
import { Link, useLoaderData } from "react-router-dom";
import ImageCard from "../Components/ImagesCard";
import GridImages from '../Components/GridImages';
import AvaiableModes from "../Components/AvaiableModes";
import Rewards from "../Components/Rewards";
import Footer from "../Components/Footer";
import Navbar from "../Components/navbar";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const [valorantResponse] = await Promise.all([
      customFetch.get("/games/name/valorant"),
    ]);
    return {
      valorant: valorantResponse.data.games || [],
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to fetch data");
    return {
      valorant: [],
    };
  }
};

const ValorantContext = createContext();

const Valorant = () => {
  const { valorant } = useLoaderData();

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#161D22",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: { xs: "1rem", md: "0" },
      }}
    >
      <Navbar />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "50vh", md: "80vh" },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={bg}
          alt="Valorant"
          sx={{
            width: "100vw", // Full width of the viewport
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30%",
            background:
              "linear-gradient(to bottom, rgba(22, 29, 34, 0) 0%, rgba(22, 29, 34, 1) 100%)",
            zIndex: 2,
          }}
        />
         <Box
            sx={{
              position: "absolute",
              top: { xs: "30%", md: "70%" },
              left: { xs: "10%", md: "0%" },
              transform: "translateY(-50%)",
              color: "#E5E6E4",
              fontSize: { xs: "3rem", md: "3rem" },
              fontWeight: "bold",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: { xs: "none", md: "block" },
                fontSize: { xs: "14px", md: "18px" },
                paddingTop: "10rem",
              }}
            >
            Join in your affordable mode to play and seize the victory for
            yourself! Whether you're a casual gamer or a competitive player, our
            platform offers various modes tailored to fit your style.
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: "#E5E6E4",
          textAlign: "center",
          backgroundColor: "#161D22",
          marginBottom: 3,
        }}
      >
        Available Tournaments
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          width: "auto",
          flexDirection: "column",
          margin: { xs: "1rem 4rem", md: "2rem 2.5rem" }, // Adjust margins
          backgroundColor: "#161D22",
        }}
      >
        <ValorantContext.Provider value={valorant}>
          <ImageCard cards={valorant} />
        </ValorantContext.Provider>
      </Box>
      <Box
        sx={{
          backgroundColor: "#222D34",
          width: { xs: "100%", md: "90%" }, // Change to 100% for mobile
          height: "auto", // Allow height to adjust based on content
          margin: { xs: "1rem 0", md: "2rem 3.5rem" }, // Adjust margins for mobile
          boxSizing: "border-box",
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack items on mobile
          alignItems: "center",
          padding: { xs: "1rem", md: "0" }, // Add padding for mobile
        }}
      >
        <Box
          sx={{
            margin: { xs: "0rem 1rem", md: "4rem 5rem" }, // Adjust margins for mobile
            width: { xs: "auto", md: "20rem" }, // Use auto width for mobile
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: { xs: "28px", md: "40px" }, // Adjust font size for mobile
            }}
          >
            Build Your Own Community
          </Typography>
          <Typography
            sx={{
              padding: { xs: "1rem", md: "2rem 1rem" }, // Adjust padding for mobile
              color: "white",
              fontSize: { xs: "14px", md: "16px" }, // Adjust font size for mobile
            }}
          >
            Forge your own thriving community, engaging in thrilling challenges
            against a dynamic roster of simulated players. Strategize, compete,
            and rise to the top as you cultivate a vibrant network of allies and
            rivals in an immersive gaming experience.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: { xs: "0rem", md: "2rem" }, // Adjust padding for mobile
            height: "auto", // Allow height to be determined by content
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <GridImages />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "auto",
          color: "white",
          textAlign: "center",
          padding: "2rem 0",
        }}
      >
        Available Modes
        <AvaiableModes />
      </Box>

      <Box
        sx={{
          backgroundColor: "#222D34",
          width: "95%",
          height: { xs: "auto", md: "34rem" },
          textAlign: "center",
          margin: "0 auto",
          padding: { xs: "1rem", md: "0" },
        }}
      >
        <Rewards />
      </Box>
      <Box
        sx={{
          width: "auto",
          height: "10rem",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default Valorant;
