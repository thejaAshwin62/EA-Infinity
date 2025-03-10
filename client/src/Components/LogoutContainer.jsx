import { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useDashboardContext } from "../Pages/Dashboard";

const LogoutContainer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logoutUser } = useDashboardContext(); // Use context to get user and logout function

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (logoutUser) {
      logoutUser(); // Call the logout function from context
    }
    handleClose(); // Close the menu after logout
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        endIcon={<FaCaretDown />}
        sx={{
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: { xs: "0.5rem", md: "1rem" }, // Adjust padding for mobile
          fontSize: { xs: "0.875rem", md: "1rem" }, // Adjust font size for mobile
        }}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            style={{
              width: "47px", // Smaller size for mobile
              height: "45px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "8px",
            }}
          />
        ) : (
          <FaUserCircle size={30} style={{ marginRight: "8px" }} /> // Smaller icon for mobile
        )}
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
        >
          {user?.name}
        </Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem sx={{ margin:"0 1.5rem"}} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default LogoutContainer;
