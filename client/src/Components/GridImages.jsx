import React from "react";
import { Grid, Box } from "@mui/material";
import img from "../assets/grid.jpeg";
import Img2 from "../assets/GridImages/1_vertical.jpg";
import Img3 from "../assets/GridImages/2_vertical.jpg";
import Img4 from "../assets/GridImages/hori.jpg";
export default function GridImages() {
  return (
    <>
      <Grid
        container
        spacing={4} // Increase spacing between grid items
        sx={{
          width: "100%", // Adjust to content width
          height: "auto", // Full height based on content
          padding:"2rem",
          boxSizing: "border-box", // Include padding in width and height calculations
        }}
      >
        <Grid item xs={6} md={8}>
          <Box
            sx={{
              width: "100%",
              height: "100%", // Ensure the Box occupies the full height of its Grid item
              overflow: "hidden",
              position: "relative",
              borderRadius: "8px",
            }}
          >
            <img
              src={img}
              alt="Image 1"
              style={{
                width: "100%",
                height: "100%", // Ensure the image fills the Box
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
              height: "100%", // Ensure the Box occupies the full height of its Grid item
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
                height: "100%", // Ensure the image fills the Box
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
              height: "100%", // Ensure the Box occupies the full height of its Grid item
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
                height: "100%", // Ensure the image fills the Box
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6} md={8}>
          <Box
            sx={{
              width: "100%",
              height: "100%", // Ensure the Box occupies the full height of its Grid item
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
                height: "100%", // Ensure the image fills the Box
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
