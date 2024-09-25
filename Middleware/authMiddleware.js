import {
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  // Allow access without authentication for the root route
  if (req.path === "/") {
    return next();
  }

  const token = req.cookies?.token; // Safely access token from cookies

  // If no token is present and the request is not for the root route
  if (!token) {
    // Uncomment the line below if you want to return a response instead of throwing an error
    // return res.status(401).json({ message: "Authentication invalid" });

    // If you want to ensure no error is thrown for `/`, just call next here instead of throwing an error
    return next();
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    // Handle JWT verification errors
    // Again, do not throw error for the root route
    return next();
  }
};

export const checkTestUser = (req, res, next) => {
  if (req.user?.testUser) throw new BadRequestError("Demo User, Read Only!");
  next();
};

export const isAdmin = (req, res, next) => {
  const { user } = req;
  if (user && user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
};
