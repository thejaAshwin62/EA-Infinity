import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { redirect, useLoaderData } from "react-router-dom";
import AddImg from "../assets/Add.svg";
import { GameModes, GameNames } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Navbar from "../Components/navbar";
import AdminTable from "../Components/AdminTable";
import AdminCount from "../Components/AdminCount";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/all-registers");
    const admin = await customFetch.get("users/admin-stats");

    const adminData = admin.data;

    return { bookings: response.data.bookings, adminData };
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/");
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

const Admin = () => {
  const [gameData, setGameData] = useState({
    name: GameNames.VALORANT,
    slots: "",
    joinPrice: "",
    mode: GameModes.ONE_V_ONE,
    winPrice: "",
    starting: "",
    cardId: "",
    cardPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState(new Set());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loader();
        setUserData(data.bookings);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData({
      ...gameData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    Object.keys(gameData).forEach((key) => {
      formData.append(key, gameData[key]);
    });

    try {
      await customFetch.post("/games", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Game added successfully");
      redirect("/");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to add Game");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await customFetch.delete(`users/bookings/${bookingId}`);
      setUserData((prevBookings) =>
        prevBookings.filter((booking) => booking.bookingId !== bookingId)
      );
      toast.success("Booking deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete booking.");
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedBookings(
        new Set(userData.map((booking) => booking.bookingId))
      );
    } else {
      setSelectedBookings(new Set());
    }
  };

  const handleSelect = (bookingId) => {
    setSelectedBookings((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(bookingId)) {
        updatedSelection.delete(bookingId);
      } else {
        updatedSelection.add(bookingId);
      }
      return updatedSelection;
    });
  };

  return (
    <>
      <Navbar />
      <form
        method="post"
        encType="multipart/form-data"
        className="form"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            backgroundColor: { xs: "#151C22", md: "#222D34" },
            width: "100%",
            height: { xs: "auto", md: "80vh" },
            boxSizing: "border-box",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            marginTop: { xs: "3rem", md: "7rem" },
            padding: { xs: "2rem", md: "0 6rem" },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {!isMobile && (
            <img
              src={AddImg}
              alt="Vertical"
              style={{
                maxWidth: "35%",
                maxHeight: "80%",
                objectFit: "cover",
                marginRight: "2rem",
              }}
            />
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              padding: "2rem",
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
              component="h1"
              variant={isMobile ? "h5" : "h4"}
              sx={{ mb: 2, color: "white", textAlign: "center" }}
            >
              Add Games
            </Typography>
            <Divider sx={{ width: "100%", mb: 2, bgcolor: "white" }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  select
                  value={gameData.name}
                  name="name"
                  onChange={handleChange}
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
                  value={gameData.slots}
                  name="slots"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Join Price"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={gameData.joinPrice}
                  name="joinPrice"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Mode"
                  variant="outlined"
                  select
                  fullWidth
                  value={gameData.mode}
                  name="mode"
                  onChange={handleChange}
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
                  value={gameData.winPrice}
                  name="winPrice"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Starting"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={gameData.starting}
                  name="starting"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="CardId"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={gameData.cardId}
                  name="cardId"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="CardPassword"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={gameData.cardPassword}
                  name="cardPassword"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="outlined"
              color="primary"
              disabled={loading}
              type="submit"
              sx={{
                marginTop: "1rem",
                width: "100%",
                bgcolor: "#BB61FF",
                "&:hover": {
                  bgcolor: "#a44bd6",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </Box>
        </Box>
      </form>

      <Box sx={{ margin: "2rem", padding: { xs: "0 1rem", sm: "0 2rem" } }}>
        <Typography
          sx={{
            color: "white",
            fontSize: isMobile ? "24px" : "30px",
            textAlign: "center",
          }}
        >
          Admin Panel
        </Typography>
        <br />
        <AdminTable
          bookingData={userData}
          onDelete={handleDelete}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          selectedBookings={selectedBookings}
        />
      </Box>
      <Box>
        <AdminCount />
      </Box>
    </>
  );
};

export default Admin;
