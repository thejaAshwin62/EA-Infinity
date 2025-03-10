import { Router } from "express";
import {
  allBooking,
  getAllUsers,
  getCurrentUser,
  updateUser,
} from "../Controllers/UserController.js";
import {
  deleteBooking,
  getAdminStats,
  getRegisteredUsersForGame,
  getUserBookings,
  getUserRegisteredGames,
} from "../Controllers/BookedGames.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/booked-details/:userId", getUserBookings);
router.get("/:userId/registered-games", getUserRegisteredGames);
router.get("/all-users", getAllUsers);
router.get("/:gameId/registered-users", getRegisteredUsersForGame);
router.patch("/update-user", updateUser);
router.get("/all-registers",allBooking)
router.delete("/bookings/:bookingId", deleteBooking);
router.get("/admin-stats", getAdminStats);
export default router;
