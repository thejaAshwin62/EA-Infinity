import React, { useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { GameModes, GameNames } from "../../../utils/constants";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EditImg from "../assets/Edit.svg";
import { ArrowBack } from "@mui/icons-material";

// Loader function
export const loader = async ({ params }) => {
  try {
    const [data] = await Promise.all([customFetch.get(`/games/${params.id}`)]);
    return {
      game: data.data.games || {},
    };
  } catch (error) {
    toast.error(error.response.data.msg);
    return {
      game: {},
    };
  }
};

const gameNames = Object.keys(GameNames).map((key) => ({
  value: GameNames[key],
  label: key.charAt(0) + key.slice(1).toLowerCase(),
}));

const gameModes = Object.keys(GameModes).map((key) => ({
  value: GameModes[key],
  label: key.charAt(0) + key.slice(1).toLowerCase(),
}));

const EditGames = () => {
  const { game } = useLoaderData();
  const navigate = useNavigate();
console.log(game);

  const [formData, setFormData] = useState({
    name: game.name || "",
    slots: game.slots || "",
    joinPrice: game.joinPrice || "",
    mode: game.mode || "",
    winPrice: game.winPrice || "",
    starting: game.starting || "",
    cardId: game.cardId || "",
    cardPassword: game.cardPassword || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customFetch.patch(`/games/${game._id}`, formData);
      toast.success("Game edited successfully");
      navigate(`/allgames/${game.name}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.msg);
    }
  };

  const theme = useTheme();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          position: "fixed", // Fixed position
          top: 0,
          left: 0,
          width: "100%", // Full width
          zIndex: 1300, // Ensure it appears above other elements
          display: "flex", // Show on all screen sizes
          justifyContent: "flex-start",
          padding: theme.spacing(1),
          backgroundColor: "#161D22", // Set background color
          borderRadius: 1, // Optional: add rounded corners
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
              backgroundColor: "#161D22", // Subtle hover effect
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "#222D34",
          width: "100%",
          height: { xs: "auto", md: "28rem" },
          boxSizing: "border-box",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5rem",
          padding: { xs: "1rem", md: "0 6rem" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "60%" },
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            padding: { xs: "1rem", md: "2rem" },

            "& .MuiTextField-root": {
              marginBottom: "1rem",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            },
            "& .MuiButton-root": {
              borderColor: "white",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
            },
          }}
        >
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              marginBottom: "1rem",
              fontSize: { xs: "24px", md: "30px" },
            }}
          >
            Edit Game
          </Typography>
          <Grid container spacing={2}>
            {/* Form Fields */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                select
                value={formData.name}
                name="name"
                onChange={handleInputChange}
              >
                {gameNames.map((name) => (
                  <MenuItem key={name.value} value={name.value}>
                    {name.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Slots"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.slots}
                name="slots"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Join Price"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.joinPrice}
                name="joinPrice"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mode"
                variant="outlined"
                select
                fullWidth
                value={formData.mode}
                name="mode"
                onChange={handleInputChange}
              >
                {gameModes.map((mode) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Win Price"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.winPrice}
                name="winPrice"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Starting"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.starting}
                name="starting"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="CardId"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.cardId}
                name="cardId"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="CardPassword"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.cardPassword}
                name="cardPassword"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#BB61FF",
              color: "#fff",
              "&:hover": {
                bgcolor: "#BB61FF",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
            fullWidth
          >
            Update
          </Button>
        </Box>
        ...
        <Box>
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
            <Box sx={{ marginBottom: "2rem" }}>
              {" "}
              {/* Add margin here */}
              <img
                alt="Edit"
                src={EditImg}
                style={{
                  width: "auto",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Box>
          </Grid>
        </Box>
      </Box>
    </form>
  );
};

export default EditGames;
