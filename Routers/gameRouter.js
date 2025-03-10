import { Router } from "express";
import {
  createGames,
  getOneGame,
  getAllGames,
  updateGame,
  deleteGame,
  getGamesByName,
} from "../Controllers/gameController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { validIdParam } from "../Middleware/validationMiddleware.js";
import { bookGameForUser } from "../Controllers/UserController.js";

const router = Router();

router.route("/").post(isAdmin, createGames).get(getAllGames);

router
  .route("/:id")
  .get(validIdParam, getOneGame)
  .patch(validIdParam, updateGame)
  .delete(validIdParam, deleteGame);

router.post("/:gameId/book/:userId", bookGameForUser);
router.get("/name/:name", getGamesByName);

export default router;
