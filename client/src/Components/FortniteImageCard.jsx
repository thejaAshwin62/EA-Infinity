import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import FortniteGrid from "../assets/fortnitegrid.jpg";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useDashboardContext } from "../Pages/Dashboard";
import { Link } from "react-router-dom";

const cardStyle = {
  maxWidth: 300,
  minHeight: "25rem",
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  color: "white",
  backgroundColor: "#161D22",
};

const backgroundImageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${FortniteGrid})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(3px)",
  zIndex: 0,
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(3px)",
  zIndex: 1,
};

const headerStyle = {
  position: "relative",
  zIndex: 2,
  padding: "1rem",
};

const priceStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  color: "white",
  padding: "0.4rem 1rem",
  borderRadius: "10px",
  fontSize: "1rem",
  backdropFilter: "blur(12px)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = {
  backgroundColor: "#180B36",
  color: "white",
  width: "8rem",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "red",
  },
  marginTop: "1rem",
};

const FortniteGridImages = ({ cards, setCards }) => {
  const { user } = useDashboardContext();
  const [localBookingStatus, setLocalBookingStatus] = useState({});

  const handleDelete = async (id) => {
    try {
      await customFetch.delete(`/games/${id}`);
      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
      toast.success("Game deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete game.");
    }
  };

  const handleBooking = async (gameId) => {
    setLocalBookingStatus((prevStatus) => ({
      ...prevStatus,
      [gameId]: "booked",
    }));

    try {
      await customFetch.post(`/games/${gameId}/book/${user._id}`);
      toast.success("Game booked successfully.");
    } catch (error) {
      toast.error(error.response.data.msg || "Failed to book game.");
      setLocalBookingStatus((prevStatus) => ({
        ...prevStatus,
        [gameId]: "available",
      }));
    }
  };

  return (
    <Grid container spacing={10} justifyContent="center">
      {cards.map((card, index) => {
        const totalSlots = card.slots || 0;
        const registeredUsersCount = card.registeredUsers?.length || 0;
        const isUserBooked = card.registeredUsers.includes(user._id);
        const bookingStatus =
          localBookingStatus[card._id] ||
          (isUserBooked ? "booked" : "available");

        return (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <Card sx={cardStyle}>
              <Box sx={backgroundImageStyle}></Box>
              <Box sx={overlayStyle}></Box>
              <Box sx={headerStyle}>
                <CardHeader
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  title={
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "2rem",
                        color: "#FFF9E3",
                      }}
                    >
                      {card.mode}
                    </Typography>
                  }
                  subheader={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          ID: {user.role === "admin" && card.cardId}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          PS: {user.role === "admin" && card.cardPassword}
                        </Typography>
                      </Box>
                      {user.role === "user" && (
                        <Link to={"/allgames/challenges"}>
                          <Button
                            sx={{
                              background: "white",
                              color: "black",
                              marginRight: "2rem",
                              padding: "2px 4px",
                              fontSize: "12px",
                              borderRadius: "4px",
                              "&:hover": {
                                background: "white",
                                opacity: 0.9,
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            Show
                          </Button>
                        </Link>
                      )}
                      <Typography variant="h6" sx={priceStyle}>
                        Price: ${card.joinPrice}
                      </Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    An immersive battle royale experience
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", padding: "4px" }}
                  >
                    Today {card.starting} PM
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", fontSize: "1rem" }}
                  >
                    Slots: {registeredUsersCount}/{totalSlots}
                  </Typography>
                  <Box sx={{ padding: "0 3.4rem", textAlign: "center" }}>
                    {user.role === "admin" ? (
                      <>
                        <Button
                          component={Link}
                          to={`/allgames/edit-game/${card._id}`}
                          size="small"
                          sx={{
                            color: "white",
                            background: "#BB61FF",
                            "&:hover": {
                              background: "#a855f7",
                            },
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(card._id)}
                          size="small"
                          sx={{
                            color: "white",
                            background: "#BB61FF",
                            "&:hover": {
                              background: "#a855f7",
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          ...buttonStyle,
                          backgroundColor: isUserBooked
                            ? "gray"
                            : buttonStyle.backgroundColor,
                          color: isUserBooked ? "white" : buttonStyle.color,
                          "&.Mui-disabled": {
                            backgroundColor: "#180B36",
                            color: "white",
                          },
                          "&:hover": {
                            backgroundColor: isUserBooked
                              ? "gray"
                              : buttonStyle["&:hover"].backgroundColor,
                          },
                        }}
                        onClick={() => handleBooking(card._id)}
                        disabled={isUserBooked}
                      >
                        {bookingStatus === "booked"
                          ? "Booked"
                          : `Join - $${card.joinPrice}`}
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FortniteGridImages;
