import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  // Allow access without authentication for the root route
  if (req.path === "/") {
    return next(); // No error for root route
  }

  const token = req.cookies?.token; // Safely access token from cookies

  // If no token is present and the request is not for the root route
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid"); // This will throw an error for all routes except '/'
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
