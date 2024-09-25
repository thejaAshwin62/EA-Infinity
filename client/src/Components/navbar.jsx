import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutContainer from "./LogoutContainer";

const Navbar = ({ onMenuToggle }) => {
  const [bgColor, setBgColor] = useState("rgba(22, 29, 34, .2)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Track visibility
  const location = useLocation();

  // Handle scroll to change background color and visibility
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;

      // Change background color based on scroll position
      setBgColor(currentScrollY > 50 ? "#161D22" : "rgba(22, 29, 34, .2)");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Ensure scrolling is enabled initially
  useEffect(() => {
    document.body.style.overflow = "auto"; // Ensure scroll is enabled on mount

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, []);

  // Toggle menu and control body scrolling
  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => {
      const newState = !prevMenuOpen;
      document.body.style.overflow = newState ? "hidden" : "auto"; // Control scrolling

      if (onMenuToggle) {
        onMenuToggle(newState);
      }

      return newState;
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: isVisible ? "flex" : "none", // Control visibility
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: bgColor,
        background:
          "linear-gradient(to top, rgba(22, 29, 34, 0) 0%, rgba(22, 29, 34, 1) 100%)",
        zIndex: 1000,
        transition:
          "background-color 0.3s ease-in-out, transform 0.3s ease-in-out", // Smooth transition
        transform: isVisible ? "translateY(0)" : "translateY(-100%)", // Slide effect
      }}
    >
      {/* Menu Icon */}
      <IconButton
        onClick={toggleMenu}
        sx={{
          display: { xs: "block", md: "none" },
          color: "#E5E6E4",
          zIndex: 1100,
        }}
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Links/Menu */}
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
          zIndex: 1000,
        }}
      >
        <Link to="/">
          <Button
            sx={{
              my: 2,
              color: isActive("/") ? "#FFFFFF" : "#E5E6E4",
              borderBottom: isActive("/") ? "2px solid #FFFFFF" : "none",
              "&:hover": { color: "#FFFFFF" },
            }}
          >
            Home
          </Button>
        </Link>

        <Link to="/allgames">
          <Button
            sx={{
              my: 2,
              color: isActive("/allgames") ? "#FFFFFF" : "#E5E6E4",
              borderBottom: isActive("/allgames")
                ? "2px solid #FFFFFF"
                : "none",
              "&:hover": { color: "#FFFFFF" },
            }}
          >
            All Games
          </Button>
        </Link>

        <Link to="/allgames/challenges">
          <Button
            sx={{
              my: 2,
              color: isActive("/allgames/challenges") ? "#FFFFFF" : "#E5E6E4",
              borderBottom: isActive("/allgames/challenges")
                ? "2px solid #FFFFFF"
                : "none",
              "&:hover": { color: "#FFFFFF" },
            }}
          >
            My Challenges
          </Button>
        </Link>

        <Link to="/allgames/stats">
          <Button
            sx={{
              my: 2,
              color: isActive("/allgames/stats") ? "#FFFFFF" : "#E5E6E4",
              borderBottom: isActive("/allgames/stats")
                ? "2px solid #FFFFFF"
                : "none",
              "&:hover": { color: "#FFFFFF" },
            }}
          >
            Stats
          </Button>
        </Link>

        <LogoutContainer />
      </Box>
    </Box>
  );
};

export default Navbar;
