import React from "react";
import { Grid, Box } from "@mui/material";
import Img2 from "../assets/GridImages/pubg_1.jpg";
import Img3 from "../assets/GridImages/pubg_2.jpg";
import Img4 from "../assets/GridImages/hori_2.jpg";
import Img5 from "../assets/GridImages/hori_5.jpg";

export default function PubgGridImages() {
  return (
    <Grid
      container
      spacing={4} // Increase spacing between grid items
      sx={{
        width: "100%", // Full width to fit the container
        height: "100%", // Adjust height based on content
        padding: { xs: "1rem", md: "1rem" }, // Responsive padding
        boxSizing: "border-box", // Include padding in width and height calculations
        margin: 0 , // Remove any default margin
      }}
    >
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            width: "100%",
            height: "100%", // Adjust height automatically based on image
            overflow: "hidden",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <img
            src={Img5}
            alt="Image 1"
            style={{
              width: "100%",
              height: "auto", // Maintain aspect ratio
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={6} md={4}>
        <Box
          sx={{
            width: "100%",
            height: "auto", // Adjust height automatically based on image
            overflow: "hidden",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <img
            src={Img2}
            alt="Image 2"
            style={{
              width: "100%",
              height: "100%", // Maintain aspect ratio
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={6} md={4}>
        <Box
          sx={{
            width: "100%",
            height: "auto", // Adjust height automatically based on image
            overflow: "hidden",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <img
            src={Img3}
            alt="Image 3"
            style={{
              width: "100%",
              height: "100%", // Maintain aspect ratio
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            width: "100%",
            height: "auto", // Adjust height automatically based on image
            overflow: "hidden",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <img
            src={Img4}
            alt="Image 4"
            style={{
              width: "100%",
              height: "100%", // Maintain aspect ratio
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
