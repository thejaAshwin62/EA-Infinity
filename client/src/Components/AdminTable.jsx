import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FaUserCircle } from "react-icons/fa";

const AdminTable = ({ bookingData = [], onDelete }) => {
  const [selectedBookings, setSelectedBookings] = useState(new Set());

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedBookings(
        new Set(bookingData.map((booking) => booking.bookingId))
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

  const handleDeleteSelected = () => {
    if (selectedBookings.size > 0) {
      selectedBookings.forEach((bookingId) => onDelete(bookingId));
      setSelectedBookings(new Set());
    }
  };

  // Check if bookingData is an array before mapping
  if (!Array.isArray(bookingData)) {
    return <div>Error: Data is not an array.</div>;
  }

  return (
    <>
      {selectedBookings.size > 0 && (
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteSelected}
          sx={{
            mb: 2,
            color: "#fff",
            borderColor: "#f44336",
            "&:hover": {
              borderColor: "#c62828",
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Delete Selected
        </Button>
      )}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#4E575D", // Background color for the table container
          color: "#fff",
          border: "1px solid #444",
        }}
      >
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell
                padding="checkbox"
                sx={{ backgroundColor: "#4E575D", color: "#fff" }} // Heading color
              >
                <Checkbox
                  checked={selectedBookings.size === bookingData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ backgroundColor: "#4E575D", color: "#fff" }}>
                User
              </TableCell>
              <TableCell sx={{ backgroundColor: "#4E575D", color: "#fff" }}>
                Game
              </TableCell>
              <TableCell sx={{ backgroundColor: "#4E575D", color: "#fff" }}>
                Join Price
              </TableCell>
              <TableCell sx={{ backgroundColor: "#4E575D", color: "#fff" }}>
                Game Mode
              </TableCell>
              <TableCell sx={{ backgroundColor: "#4E575D", color: "#fff" }}>
                Win Price
              </TableCell>
              <TableCell sx={{ backgroundColor: "#4E575D", color: "#fff" }}>
                Starting
              </TableCell>
              <TableCell sx={{ backgroundColor: "#4E575D", color: "#fff" }} />
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {bookingData.map((booking) => (
              <TableRow key={booking.bookingId}>
                <TableCell
                  padding="checkbox"
                  sx={{ backgroundColor: "#222D34" }}
                >
                  <Checkbox
                    checked={selectedBookings.has(booking.bookingId)}
                    onChange={() => handleSelect(booking.bookingId)}
                  />
                </TableCell>
                <TableCell sx={{ backgroundColor: "#222D34", color: "#fff" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    {booking.userAvatar ? (
                      <img
                        src={booking.userAvatar}
                        alt={booking.userName}
                        style={{ width: 48, height: 48, borderRadius: "50%" }}
                      />
                    ) : (
                      <FaUserCircle
                        size={40}
                        style={{ marginRight: "8px", color: "white" }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: "bold", color: "#fff" }}>
                        {booking.userName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#222D34", color: "#fff" }}>
                  {booking.gameName}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#222D34", color: "#fff" }}>
                  {booking.joinPrice}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#222D34", color: "#fff" }}>
                  {booking.gameMode}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#222D34", color: "#fff" }}>
                  {booking.winPrice}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#222D34", color: "#fff" }}>
                  {booking.starting ? `${booking.starting} PM` : "NULL"}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#222D34" }}>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(booking.bookingId)}
                  >
                    <DeleteIcon sx={{ color: "#f44336" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminTable;
