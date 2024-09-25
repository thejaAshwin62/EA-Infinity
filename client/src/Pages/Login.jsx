import React from "react";
import { Form, redirect, Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Container,
  Divider,
  useTheme,
  Box,
} from "@mui/material";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import LoginImg from "../assets/login.svg";
import LoginBg from "../assets/loginbg.png";
import { ArrowBack } from "@mui/icons-material";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {/* Background Section */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${LoginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)",
          zIndex: -1, // Ensure it is behind the content
        }}
      >
        
      </div>
      {/* Back Button */}
      <Box
        sx={{
          position: "fixed", // Fixed on mobile
          top: 5,
          left: 3,
          width: "100%",
          zIndex: 1300, // Ensure it appears above other elements
          display: { xs: "flex", sm: "flex" }, // Display on all screen sizes
          justifyContent: "flex-start",
          padding: theme.spacing(1),
        }}
      >
        <Button
          color="primary"
          startIcon={<ArrowBack />} // Add the back arrow icon
          onClick={handleBack} // Navigate back
          sx={{
            borderRadius: 2,
            padding: "0.5rem 1rem",
            textTransform: "none",
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "lightgray",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle hover effect
            },
          }}
        >
          Back
        </Button>
      </Box>
      <Container
        sx={{
          height: "100%",
          width: "100%", // Full width of viewport
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          "@media (max-width: 600px)": {
            padding: 1,
            height: "auto",
            marginTop: "4rem", // Add space for the back button on mobile
          },
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{ maxWidth: "1200px", margin: "0 auto", paddingRight:" 2rem"}}
        >
          {/* Form Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 1, md: 1 },
            }}
          >
            <Paper
              elevation={6}
              sx={{
                padding: { xs: 2, sm: 4 },
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "12px",
                bgcolor: "#222D34", // Dark background color for form paper
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                border: "2px solid white", // White outline
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ mb: 2, color: "white" }} // White text color
              >
                Login
              </Typography>
              <Divider sx={{ width: "100%", mb: 2, bgcolor: "white" }} />
              <Form method="post" style={{ width: "100%" }}>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  sx={{
                    mb: 1,
                    "& .MuiInputBase-root": {
                      color: "white", // White text color
                    },
                    "& .MuiFormLabel-root": {
                      color: "white", // White label color
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white", // White border color
                    },
                  }}
                />
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                    "& .MuiInputBase-root": {
                      color: "white",
                    },
                    "& .MuiFormLabel-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 1,
                    bgcolor: "#BB61FF", // Same color scheme as Register
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#a44bd6",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  fullWidth
                >
                  Login
                </Button>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ mt: 2, color: "#E5E6E4" }} // White text color
                >
                  Not a user?{" "}
                  <Link
                    to="/register"
                    style={{ color: "#BB61FF", textDecoration: "none" }}
                  >
                    Register
                  </Link>
                </Typography>
              </Form>
            </Paper>
          </Grid>

          {/* Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" }, // Hide on mobile
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 2, md: 2 },
              marginBottom: { xs: 2, md: 0 },
            }}
          >
            <img
              alt="Login"
              src={LoginImg}
              style={{
                width: "auto",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Same shadow effect
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
