import React from "react";
import { Grid, Box } from "@mui/material";
import Img2 from "../assets/GridImages/fort_1.jpg";
import Img3 from "../assets/GridImages/fort_2.jpg";
import Img4 from "../assets/GridImages/hori_3.jpg";
import Img5 from "../assets/GridImages/hori_4.jpg";

export default function FortniteGridImages() {
  return (
    <Grid
      container
      spacing={4} // Increase spacing between grid items
      sx={{
        width: "100%", // Full width
        padding: "2rem", // Padding around the grid
        boxSizing: "border-box", // Include padding in width and height calculations
      }}
    >
      {/* Display 2 images per row only on mobile devices */}
      <Grid item xs={6} sm={6} md={8}>
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
            src={Img5}
            alt="Fortnite Grid"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <img
            src={Img2}
            alt="Fortnite Image 2"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>

      {/* Second row, two images on mobile */}
      <Grid item xs={6} sm={6} md={4}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <img
            src={Img3}
            alt="Fortnite Image 3"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={8}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <img
            src={Img4}
            alt="Fortnite Image 4"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
