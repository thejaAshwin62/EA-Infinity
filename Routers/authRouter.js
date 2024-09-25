import { Router } from "express";

import {
  ValidateRegisterInput,
  ValidateLoginInput,
  Logout,
} from "../Middleware/validationMiddleware.js";
import { register, login } from "../Controllers/authController.js";
const router = Router();
router.post("/register", ValidateRegisterInput, register);
router.post("/login", ValidateLoginInput, login);
router.get("/logout", Logout);
router.get("/me", (req, res) => {
  const { userId, role } = req.user;
  res.status(200).json({ userId, role });
});

export default router;
