import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";
import cash from "../assets/cash.png";
import robox from "../assets/roblox.png";
import vbugs from "../assets/vbugs.png";
import uc from "../assets/uc.png";
import xbox from "../assets/xbox.jpg";
import amazon from "../assets/amazon.png";

const Rewards = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: "2rem",
          color: "white",
          textAlign: "center",
          fontSize: { xs: "24px", md: "30px" }, // Responsive font size
          fontWeight: "bold",
        }}
      >
        Rewards
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on mobile, horizontally on larger screens
          justifyContent: "space-between", // Space between grid and typography
          alignItems: "center",
          padding: "2rem",
        }}
      >
        {/* Image Grid Section */}
        <Box
          sx={{
            display: "grid",
            margin: { xs: "1rem 0", md: "0rem 3rem" }, // Responsive margins
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, // 2 columns on mobile, 3 on larger screens
            gap: { xs: "2rem", md: "5rem" }, // Adjust gap for better spacing
          }}
        >
          {[
            { image: cash, label: "Cash" },
            { image: robox, label: "Roblox" },
            { image: vbugs, label: "V-Bucks" },
            { image: uc, label: "UC" },
            { image: xbox, label: "Xbox" },
            { image: amazon, label: "Amazon" },
          ].map((reward, index) => (
            <Box
              key={index}
              sx={{
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "1rem",
                borderRadius: "10px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                image={reward.image}
                alt={`${reward.label} Payment Icon`}
                sx={{
                  maxWidth: { xs: "80px", md: "110px" }, // Responsive max width
                  height: "auto",
                  objectFit: "contain", // Maintain aspect ratio
                }}
              />
              <Typography sx={{ color: "white", marginTop: "8px" }}>
                {reward.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Redeem Typography Section */}
        <Box
          sx={{
            width: { xs: "90%", md: "30rem" }, // Responsive width
            height: "auto", // Allow height to be determined by content
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            padding: "1rem",
            borderRadius: "10px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            margin: { xs: "1rem 0", md: "0" }, // Responsive margins
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "20px", md: "22px" }, // Responsive font size
              fontWeight: "bold",
              mb: 1,
            }}
          >
            Redeem
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "14px", md: "16px" }, // Responsive font size
              padding: { xs: "0 0rem", md: "0" }, // Add padding for mobile
            }}
          >
            Participate in exciting tournaments where you can challenge your
            skills and compete with others. Earn valuable and convenient rewards
            as you play, which you can easily redeem directly to your account.
            Experience the thrill of victory and make the most of your gaming
            journey with exclusive prizes.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Rewards;
