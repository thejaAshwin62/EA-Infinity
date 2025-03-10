import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#161D22", // Black background
        color: "white", // White text color
        textAlign: "center",
        py: 4,
        mt: 5,
        borderTop: "1px solid #333333", // Darker border for contrast
      }}
    >
      {/* Social Media Section */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2, // Add spacing between icons
        }}
      >
        {[
          {
            icon: faGithub,
            label: "GitHub",
            link: "https://github.com/thejaAshwin62",
          },
          {
            icon: faLinkedin,
            label: "LinkedIn",
            link: "https://www.linkedin.com/in/theja-ashwin-632367289/",
          },
          {
            icon: faGoogle,
            label: "Google",
            link: "mailto:thejaashwin62@gmail.com",
          },
          {
            icon: faInstagram,
            label: "Instagram",
            link: "https://www.instagram.com/in_justice_don_/",
          },
        ].map(({ icon, label, link }) => (
          <IconButton
            key={label}
            href={link} // Use the actual link here
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // Security best practice
            aria-label={label}
            sx={{
              color: "white",
              m: 1,
              "&:hover": {
                color: "red", // Red color on hover
              },
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </IconButton>
        ))}
      </Box>

      {/* Copyright Section */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.2)", // Slightly transparent background
          p: { xs: 1, md: 2 }, // Responsive padding
        }}
      >
        <Typography variant="body2" color="white">
          © 2024 Copyright : <span></span>
          <a
            href="mailto:thejaashwin62@gmail.com"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            thejaashwin62@gmail.com
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
