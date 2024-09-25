import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  ListItemAvatar,
} from "@mui/material";
import Banner from "../assets/banner.jpg";
import Navbar from "../Components/navbar";
import { UserStatus } from "../../../utils/constants.js";
import { useDashboardContext } from "./Dashboard";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { FaUserCircle } from "react-icons/fa";
import CardBG from "../assets/card_bg.jpg";

const Stats = () => {
  const [image, setImage] = useState(null);
  const { user } = useDashboardContext(); // Getting the user data from the dashboard context

  const bookings = user.bookings.length;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file); // Check if file is selected
      setImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);

    try {
      // Send PATCH request to update the user profile
      await customFetch.patch("/users/update-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div>
      {/* Banner Image */}
      <div style={{ position: "relative", width: "100%", height: "15rem" }}>
        <img
          src={Banner}
          alt="Banner"
          style={{
            width: "100%",
            height: "15rem",
            objectFit: "cover", // Ensures image fits the container
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(22, 29, 34, 0) 0%, rgba(22, 29, 34, 1) 130%)",
          }}
        />
      </div>
      <Navbar />

      {/* Main Container */}
      <Box
        sx={{
          position: "absolute",
          top: "18%",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "15rem",
        }}
      >
        <Grid container spacing={2} sx={{ width: "90%" }}>
          {/* Avatar Box */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: "center",
                width: "70%",
                height: "90%",
                margin: { xs: "0 3.5rem", md: "-0.4rem 5rem" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0.5rem",
                backgroundImage: `url(${CardBG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                padding: { xs: "1rem", md: "4rem" },
              }}
            >
              {user.avatar ? (
                <ListItemAvatar>
                  <img
                    src={user.avatar}
                    alt="user avatar"
                    style={{
                      width: "8rem",
                      maxWidth: "10rem",
                      height: "8rem",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </ListItemAvatar>
              ) : (
                <FaUserCircle
                  size={60}
                  color="white"
                  style={{ marginBottom: "0.5rem" }}
                />
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "4rem",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  sx={{
                    color: "grey",
                    fontSize: { xs: "0.8rem", md: "1.5rem" },
                    fontWeight: "bold", // Optional: make the status bold
                  }}
                >
                  {user.status.toUpperCase()}
                </Typography>
              </Box>

              <Box
                sx={{
                  paddingBottom: {
                    xs: "1.5rem",
                    marginTop: { xs: "0", md: "2rem" },
                  },
                }}
              >
                {[
                  { label: "Games Applied:", value: user.totalBookings },
                  { label: "Games Won:", value: user.gamesWin },
                  { label: "Upcoming:", value: bookings },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "white",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      padding: { xs: "0.3rem 0.7rem", md: "0.5rem 1rem" },
                      backgroundColor: "black",
                      borderRadius: "8px",
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                      marginBottom: "0.7rem",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", letterSpacing: "0.05em" }}
                    >
                      {item.label}
                    </Typography>
                    <Typography>{item.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                padding: { xs: 3, sm: 3, md: 3 }, // Keep padding smaller
                width: "80%",
                maxWidth: "400px", // Maintain smaller maxWidth
                height: "auto", // Allow auto height based on content
                minHeight: "400px", // Set a minHeight to control overall height
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "12px",
                bgcolor: "#222D34",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                margin: { xs: "0 2.5rem", md: "0 5rem" },
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  mb: 2,
                  color: "white",
                  fontSize: { xs: "1.6rem", md: "1.8rem" }, // Slightly reduce font size
                }}
              >
                Update
              </Typography>
              <Divider sx={{ width: "100%", mb: 2, bgcolor: "white" }} />

              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                style={{ width: "100%" }}
              >
                <Grid container spacing={2}>
                  {/* Avatar Upload */}
                  <Grid item xs={12}>
                    <TextField
                      name="avatar"
                      type="file"
                      htmlFor="avatar"
                      label="Avatar"
                      variant="outlined"
                      onChange={handleImageChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        "& .MuiInputBase-root": { color: "white" },
                        "& .MuiFormLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                      }}
                    />
                  </Grid>

                  {/* Email Field */}
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      defaultValue={user.email}
                      required
                      sx={{
                        "& .MuiInputBase-root": { color: "white" },
                        "& .MuiFormLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                      }}
                    />
                  </Grid>

                  {/* Name Field */}
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      type="text"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      defaultValue={user.name}
                      required
                      sx={{
                        "& .MuiInputBase-root": { color: "white" },
                        "& .MuiFormLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                      }}
                    />
                  </Grid>

                  {/* Password Field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { color: "white" },
                        "& .MuiFormLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                      }}
                    />
                  </Grid>

                  {/* Confirm Password Field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { color: "white" },
                        "& .MuiFormLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                      }}
                    />
                  </Grid>

                  {/* Status Selection */}
                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      required
                      sx={{
                        "& .MuiInputBase-root": { color: "white" },
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                      }}
                    >
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="status"
                        label="Status"
                        defaultValue={user.status}
                      >
                        {Object.values(UserStatus).map((status) => (
                          <MenuItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "100%",
                        bgcolor: "#4caf50",
                        "&:hover": {
                          bgcolor: "#45a049",
                        },
                      }}
                    >
                      Update Profile
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Stats;
