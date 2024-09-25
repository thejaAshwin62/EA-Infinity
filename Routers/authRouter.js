import { Router } from "express";
import { verifyJWT } from "../utils/tokenUtils.js";
// import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  ValidateRegisterInput,
  ValidateLoginInput,
  Logout,
} from "../Middleware/validationMiddleware.js";
import { register, login } from "../Controllers/authController.js";
const router = Router();

const authenticateUser = (req, res, next) => {
  if (req.path === "/") {
    return next();
  }

  const token = req.cookies?.token;

  if (!token) {
    return next();
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    return next();
  }
};
router.post("/register", ValidateRegisterInput, register);
router.post("/login", ValidateLoginInput, login);
router.get("/logout", Logout);
router.get("/me", authenticateUser, (req, res) => {
  const { userId, role } = req.user;
  res.status(200).json({ userId, role });
});

export default router;
