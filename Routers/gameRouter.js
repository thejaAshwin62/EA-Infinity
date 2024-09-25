import { Router } from "express";
import {
  createGames,
  getOneGame,
  getAllGames,
  updateGame,
  deleteGame,
  getGamesByName,
} from "../Controllers/gameController.js";
import { validIdParam } from "../Middleware/validationMiddleware.js";
import { bookGameForUser } from "../Controllers/UserController.js";

const router = Router();

// Define isAdmin middleware directly in the router
const isAdmin = (req, res, next) => {
  const { user } = req;
  if (user && user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
};

// Route for the root endpoint with isAdmin middleware
router.route("/").post(isAdmin, createGames).get( getAllGames); // Added isAdmin to the GET route

// Routes for individual game operations with validation middleware
router
  .route("/:id")
  .get(validIdParam, getOneGame)
  .patch(validIdParam, updateGame)
  .delete(validIdParam, deleteGame);

// Route for booking a game for a user
router.post("/:gameId/book/:userId", bookGameForUser);

// Route to get games by name
router.get("/name/:name", getGamesByName);

export default router;
