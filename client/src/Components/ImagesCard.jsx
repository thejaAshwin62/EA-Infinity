import React, { useState } from "react";
import ValoCard from "../assets/valocard.jpeg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useDashboardContext } from "../Pages/Dashboard";

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
  backgroundImage: `url(${ValoCard})`,
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

export default function ImageCard({ cards }) {
  const { user } = useDashboardContext();
  const [localBookingStatus, setLocalBookingStatus] = useState({});

  const handleDelete = async (id) => {
    try {
      await customFetch.delete(`/games/${id}`);
      toast.success("Game deleted successfully.");
      // Optionally, you can filter out the deleted card from the cards array if you want to update the UI without reloading
    } catch (error) {
      toast.error("Failed to delete game.");
    }
  };

  const handleBooking = async (gameId) => {
    // Optimistically update the state
    setLocalBookingStatus((prevStatus) => ({
      ...prevStatus,
      [gameId]: "booked",
    }));

    try {
      await customFetch.post(`/games/${gameId}/book/${user._id}`);
      toast.success("Game booked successfully.");
    } catch (error) {
      toast.error(error.response.data.msg || "Failed to book game.");
      // Revert the status if the booking fails
      setLocalBookingStatus((prevStatus) => ({
        ...prevStatus,
        [gameId]: "failed",
      }));
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {cards.map((card, index) => {
        const totalSlots = card.slots || 0;
        const registeredUsersCount = card.registeredUsers?.length || 0;
        const isUserBooked = card.registeredUsers.includes(user._id);
        const bookingStatus =
          localBookingStatus[card._id] ||
          (isUserBooked ? "booked" : "available");

        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {" "}
            {/* Adjusted xs and sm sizes */}
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
                        fontSize: { xs: "1.5rem", md: "2rem" }, // Responsive font size
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
                              marginRight: "1rem", // Adjusted margin for mobile
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
                    An immersive 1v1 battle against a player conducted as a
                    one-on-one session.
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
                  <Box sx={{ padding: "0 2rem", textAlign: "center" }}>
                    {" "}
                    {/* Adjusted padding for mobile */}
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
                        <br />
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
                        disabled={bookingStatus === "booked"}
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
}
